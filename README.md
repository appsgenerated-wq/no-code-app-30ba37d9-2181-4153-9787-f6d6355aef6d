# ChefPortfolio - A Food App for Chefs

Welcome to ChefPortfolio, a complete React application powered exclusively by a Manifest backend. This application provides a platform for culinary professionals to manage and showcase their personal recipe collections.

## Features

- **Chef Authentication**: Secure signup and login for chefs.
- **Recipe Management**: Full CRUD (Create, Read, Update, Delete) functionality for recipes.
- **Rich Content**: Use a rich text editor for recipe descriptions and detailed instructions.
- **Image Uploads**: Add beautiful photos to each recipe, powered by Manifest's file storage.
- **Ownership Policies**: Chefs can only manage their own recipes, ensuring data integrity.
- **Automatic Admin Panel**: A complete admin interface is available at `/admin` for managing all chefs and recipes.

## Tech Stack

- **Backend**: Manifest (YAML-based backend-as-a-service)
- **Frontend**: React (Vite)
- **Styling**: Tailwind CSS
- **SDK**: `@mnfst/sdk` for all backend communication

## Getting Started

### Prerequisites

- Node.js (v18+)
- A running Manifest backend instance.

### Installation

1. **Clone the repository:**
   ```bash
   git clone <repository_url>
   cd <repository_name>
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Create a `.env.local` file in the root of your project and add your Manifest backend URL and App ID:
   ```
   VITE_BACKEND_URL=https://your-manifest-backend-url.com
   VITE_APP_ID=your-app-id
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:5173`.

## Default Credentials

- **Demo Chef**: `chef@manifest.build` / `password`
- **Admin Panel**: `admin@manifest.build` / `admin` (Access at `${BACKEND_URL}/admin`)
