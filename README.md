# Elituvchi — Food Ordering App

A modern, full-featured food ordering application built with **Expo**, **React Native**, and **Appwrite**.

## Overview

Elituvchi is a mobile food delivery app that allows users to browse restaurants, search for dishes, customize items with toppings and sides, and manage a shopping cart. The app features authentication, real-time data fetching, and a clean, intuitive UI designed with Figma.

**Stack:**
- **Frontend:** Expo SDK 54, React Native, TypeScript
- **Routing:** expo-router (file-based)
- **State Management:** Zustand
- **Styling:** NativeWind (Tailwind CSS for React Native)
- **Backend:** Appwrite (authentication, database, collections)
- **Monitoring:** Sentry (error & performance tracking)
- **Image Loading:** expo-image

## Features

- **Authentication** — Email/password sign-up and sign-in with Appwrite
- **Browse Menu** — View dishes organized by category
- **Search & Filter** — Search by dish name, filter by category with debounced input
- **Item Detail** — Full dish information (nutrition, rating, description)
- **Customizations** — Add toppings and side options with real-time pricing
- **Shopping Cart** — Manage items, adjust quantities, track totals
- **User Profile** — View user info and sign out
- **Cross-cutting Monitoring** — Sentry integration for crash & performance data

## Project Structure

```
elituvchi/
├── app/                          # Expo Router file-based routes
│   ├── (auth)/                   # Auth route group (guarded, sign-in/sign-up)
│   │   ├── _layout.tsx           # Layout with hero image & white card
│   │   ├── sign-in.tsx
│   │   └── sign-up.tsx
│   ├── (tabs)/                   # Tab route group (main app)
│   │   ├── _layout.tsx           # Bottom tab navigator
│   │   ├── index.tsx             # Home screen
│   │   ├── search.tsx            # Search & filter screen
│   │   ├── cart.tsx              # Shopping cart
│   │   └── profile.tsx           # User profile & logout
│   └── item/
│       └── [id].tsx              # Item detail screen (dynamic route)
├── components/                   # Reusable UI components
│   ├── CartButton.tsx            # Cart icon in header
│   ├── CartItem.tsx              # Cart line item
│   ├── MenuCard.tsx              # Dish card in grid
│   ├── SearchBar.tsx             # Search input
│   ├── Filter.tsx                # Category filter chips
│   └── icons/                    # Icon components
├── lib/
│   ├── appwrite.ts               # All Appwrite API functions
│   ├── useAppwrite.ts            # Generic data-fetch hook
│   ├── seed.ts                   # Database seeding script
│   └── data.ts                   # Dummy data for seeding
├── store/                        # Zustand state stores
│   ├── auth.store.ts             # Authentication & user state
│   └── cart.store.ts             # Shopping cart state
├── constants/
│   └── index.ts                  # App-wide constants (images, etc.)
├── type.d.ts                     # TypeScript interfaces & types
├── globals.css                   # NativeWind tailwind config
└── tailwind.config.js            # Tailwind configuration

```

## Getting Started

### Prerequisites

- **Node.js** 16+ and npm
- **Expo CLI** (`npm install -g expo-cli`)
- **iOS Simulator** (Xcode) or **Android Emulator** (Android Studio)
- **Appwrite Server** (self-hosted or cloud)

### Installation

1. **Clone the repo**
   ```bash
   git clone <repo-url>
   cd elituvchi
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root:
   ```
   EXPO_PUBLIC_APPWRITE_ENDPOINT=https://fra.cloud.appwrite.io/v1
   EXPO_PUBLIC_APPWRITE_PROJECT_ID=your_project_id
   ```

4. **Seed the database** (optional, populates dummy data)
   ```bash
   npm run seed
   ```

5. **Start the app**
   ```bash
   npx expo start
   ```

   Then press:
   - `i` for iOS Simulator
   - `a` for Android Emulator
   - `w` for web (limited support)

## Architecture

### Data Flow

```
Presentation Layer (expo-router screens)
        ↓
State Management (Zustand stores: auth, cart)
        ↓
Data Access Layer (useAppwrite hook + lib/appwrite.ts functions)
        ↓
Appwrite Backend (Cloud database & authentication)
```

### Key Patterns

**useAppwrite Hook** — Generic data fetching wrapper
```typescript
const { data, loading, error, refetch } = useAppwrite({
  fn: getMenu,
  params: { category: 'pizza', query: '' },
  skip: false,
});
```

**Zustand Stores** — Global state management
```typescript
const { items, addItem, removeItem, getTotalPrice } = useCartStore();
const { user, isAuthenticated, fetchAuthenticatedUser } = useAuthStore();
```

**Search Params** — URL-driven filtering
```typescript
// Navigate with params
router.push({ pathname: '/search', params: { category: 'pizza', query: 'margherita' } });

// Read in component
const { category, query } = useLocalSearchParams<{ category: string; query: string }>();
```

## Backend (Appwrite)

### Collections

| Collection | Fields | Purpose |
|---|---|---|
| `users` | email, name, avatar, accountId | User profiles |
| `categories` | name, description | Food categories (Pizza, Burgers, etc.) |
| `menu` | name, price, image_url, description, calories, protein, rating, categories (FK) | Dish/menu items |
| `customizations` | name, type, price, image_url | Toppings, sides, sizes |
| `menu_customizations` | menu (FK), customizations (FK) | Junction: links dishes to their customizations |

### Configuration

```typescript
// lib/appwrite.ts
export const appwriteConfig = {
  endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT,
  projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID,
  databaseId: '69fcc5dd00058e9688e0',
  menuCollectionId: 'menu',
  customizationCollectionId: 'customizations',
  menuCustomizationCollectionId: 'menu_customizations',
  // ...
};
```

## Key Features Explained

### Cart Deduplication

Same dish + same customizations = single cart line (quantity incremented).

```typescript
// areCustomizationsEqual() compares by sorted ID
// So "cheese + bacon" and "bacon + cheese" are treated as identical
```

### Search with Debounce

Search input waits 500ms after user stops typing before triggering API call.

```typescript
const debouncedSearch = useDebouncedCallback(
  (text: string) => router.push(`/search?query=${text}`),
  500
);
```

### Dynamic Item Details

Dish ID from URL param (`[id].tsx`) fetches full details + available customizations.

```typescript
const { id } = useLocalSearchParams<{ id: string }>();
const { data: itemData } = useAppwrite({ fn: getMenuItem, params: { id: id! } });
const { data: customizations } = useAppwrite({ fn: getMenuCustomizations, params: { id: id! } });
```

## Development

### Running Tests

```bash
npm test
```

### Building for Release

```bash
eas build --platform ios --auto
eas build --platform android --auto
```

### Code Style

- **TypeScript** — strict mode enabled
- **NativeWind** — Tailwind classes for styling
- **Zustand** — simple state stores with immutable updates
- **No comments** — self-documenting code via clear naming

## Troubleshooting

| Issue | Solution |
|---|---|
| Appwrite connection fails | Check `EXPO_PUBLIC_APPWRITE_ENDPOINT` and `EXPO_PUBLIC_APPWRITE_PROJECT_ID` in `.env` |
| Seed data not appearing | Run `npm run seed` and verify Appwrite database collections exist |
| TypeScript errors on `CartItem` | Fixed in recent commit — `CartItem` interface now properly exported in `type.d.ts` |
| Images not loading | Verify `image_url` fields in Appwrite documents are valid URLs |

## Performance & Monitoring

**Sentry Integration** — Real-time error and performance tracking across the app.

Configuration in `app.json`:
```json
{
  "plugins": ["sentry-expo/plugin"]
}
```

## Future Enhancements

- Payment integration (Stripe)
- Order history & tracking
- Push notifications
- User reviews & ratings
- Favorites/bookmarks
- Multi-language support

## License

MIT

## Contact

For questions or feedback, contact me at orifjonovdavronbek90@gmail.com
