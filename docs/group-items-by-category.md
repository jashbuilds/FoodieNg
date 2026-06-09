# Group Items by Category — Angular (Signal-based)

A beginner-friendly approach using `.filter()` and `computed()` to group and display items by category.

---

## Goal

Transform a **flat list** of items into a **category-grouped view**:

```
Before (flat):                    After (grouped):
┌──────────────────────┐          ┌──────────────────────┐
│ Dosa    south-indian │          │ 📁 South Indian      │
│ Dhokla  gujarati     │   ──►   │    ├── Dosa     ₹80  │
│ Idli    south-indian │          │    └── Idli     ₹50  │
│ Thepla  gujarati     │          │ 📁 Gujarati          │
└──────────────────────┘          │    ├── Dhokla   ₹60  │
                                  │    └── Thepla   ₹40  │
                                  └──────────────────────┘
```

---

## Approach: `.filter()` + `computed()`

This approach uses only **two things you already know**:

| Tool | Purpose |
|------|---------|
| `computed()` | Get unique category names (auto-updates when items change) |
| `.filter()` | Get items that belong to a specific category |

---

## Step-by-Step Implementation

### Step 1 — Get Unique Category Names

```typescript
import { Component, computed, input } from '@angular/core';

export class DisplayItemsComponent {

  items = input<ItemList[]>([])

  // Extracts unique category names from the items array
  categories = computed(() => {
    return [...new Set(this.items().map(item => item.category))]
  })
}
```

**How it works line by line:**

```
items() = [
  { itemName: 'Dosa',   category: 'south-indian', price: 80 },
  { itemName: 'Dhokla', category: 'gujarati',     price: 60 },
  { itemName: 'Idli',   category: 'south-indian', price: 50 },
]

Step 1: .map(item => item.category)
        → ['south-indian', 'gujarati', 'south-indian']

Step 2: new Set(...)
        → {'south-indian', 'gujarati'}       ← Set removes duplicates

Step 3: [...Set]
        → ['south-indian', 'gujarati']       ← spread back into array
```

**Why `computed()`?**
- It **caches** the result — doesn't re-calculate unless `items()` changes
- It's a **signal** — the template auto-updates when it changes

---

### Step 2 — Filter Items by Category

```typescript
getItemsByCategory(category: string) {
  return this.items().filter(item => item.category === category)
}
```

**How `.filter()` works:**

```
getItemsByCategory('south-indian')

Goes through each item:
  'Dosa'   → category is 'south-indian' → ✅ KEEP
  'Dhokla' → category is 'gujarati'     → ❌ SKIP
  'Idli'   → category is 'south-indian' → ✅ KEEP

Result: [Dosa, Idli]
```

---

### Step 3 — Template (Two Nested Loops)

```html
<!-- OUTER LOOP: Loop through each unique category name -->
@for (category of categories(); track category) {

    <h3>{{ category }}</h3>

    <!-- INNER LOOP: Loop through items that belong to this category -->
    @for (item of getItemsByCategory(category); track item.itemName) {

        <div class="card">
            <h5>{{ item.itemName }}</h5>
            <p>{{ item.category }}</p>
            <p>{{ item.price | currency:'INR' }}</p>
        </div>

    }
}
```

**What the template does:**

```
Loop 1 → category = 'south-indian'
    │
    ├── Loop 2 → getItemsByCategory('south-indian')
    │            returns [Dosa, Idli]
    │            renders Dosa card, Idli card
    │
Loop 1 → category = 'gujarati'
    │
    ├── Loop 2 → getItemsByCategory('gujarati')
    │            returns [Dhokla, Thepla]
    │            renders Dhokla card, Thepla card
```

---

## Complete Component Code

### TypeScript

```typescript
import { Component, computed, input } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { ItemList } from '../../../Models/restaurant.model';

@Component({
  selector: 'app-display-items',
  imports: [CurrencyPipe],
  templateUrl: './display-items.component.html',
  styleUrl: './display-items.component.css'
})
export class DisplayItemsComponent {

  items = input<ItemList[]>([])

  categories = computed(() => {
    return [...new Set(this.items().map(item => item.category))]
  })

  getItemsByCategory(category: string) {
    return this.items().filter(item => item.category === category)
  }
}
```

### HTML

```html
<div class="mt-5">
    @if(items().length === 0) {

        <div class="empty-state">
            <p>No Items Available!</p>
            <p>Please add Item to Preview.</p>
        </div>

    } @else {

        @for (category of categories(); track category) {

            <h3>{{ category }}</h3>

            <div class="row g-3">
                @for (item of getItemsByCategory(category); track item.itemName) {

                    <div class="col-lg-6">
                        <div class="card">
                            <img [src]="item.imageUrl" alt="{{ item.itemName }}">
                            <h5>{{ item.itemName }}</h5>
                            <p>{{ item.category }}</p>
                            <p>{{ item.price | currency:'INR' }}</p>
                            <button>Add to Menu</button>
                        </div>
                    </div>

                }
            </div>

        }
    }
</div>
```

---

## Key Concepts Summary

| Concept | What it does | Example |
|---------|-------------|---------|
| `input()` | Receives data from parent component (signal-based) | `items = input<ItemList[]>([])` |
| `computed()` | Derives new data from signals, auto-updates & caches | `categories = computed(() => ...)` |
| `new Set()` | Removes duplicate values | `new Set(['a','b','a'])` → `{'a','b'}` |
| `.map()` | Transforms each item into something else | `items.map(i => i.category)` → categories only |
| `.filter()` | Keeps only items that match a condition | `items.filter(i => i.category === 'gujarati')` |

---

## Alternative: `reduce()` Approach (Advanced)

The same grouping can be done in a single pass using `reduce()`:

```typescript
groupedItems = computed(() => {
  return this.items().reduce((groups, item) => {
    if (!groups[item.category]) groups[item.category] = []
    groups[item.category].push(item)
    return groups
  }, {} as Record<string, ItemList[]>)
})
```

| | `.filter()` approach | `reduce()` approach |
|---|---|---|
| **Readability** | ✅ Easy to understand | ⚠️ Harder for beginners |
| **Performance** | Loops once per category | Loops once total |
| **Best for** | Small-medium lists | Large datasets |
| **Recommendation** | Start with this | Refactor later when comfortable |
