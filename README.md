# Couvrant 
Finding modest clothing online means searching across dozens of sites with no guarantee of results. Couvrant solves this by aggregating modest pieces from both dedicated modest brands and mainstream retailers into one searchable platform.

## Tech Stack
- **Frontend:** React + TypeScript + Tailwind CSS
- **Backend:** Python + FastAPI
- **Database:** PostgreSQL
- **Data Sources:** CSV seeding (current) and affiliate APIs (in progress)

## Features
- Filter catalog by color, brand, category, and price range with persistent filter state across interactions
- Browse paginated product catalog with previous and next navigation, displaying 6 items per page
- View multiple product images per item through an interactive image carousel
- Featured items are prioritized and surfaced at the top of the catalog on the default view
- Search across the catalog in real time by item name or brand
- Fully responsive design optimized for mobile and desktop viewports
- Click-through links redirect users directly to the retailer's product page to purchase
- Aggregated catalog pulls modest clothing from both dedicated modest brands and mainstream retailers

## Getting Started
1. Clone the repository `git clone https://github.com/nazifadev/couvrant.git`
2. Install dependencies `pip install -r requirements.txt`
3. Create a .env file with your database connection string like this:
   `URL=postgresql://username:password@localhost/dbname`
4. Run the FastAPI server `uvicorn main:app --reload`
5. Navigate to the frontend folder `cd frontend`
6. Create a .env file in the frontend folder and add this:
   `VITE_API_URL=http://localhost:8000`
7. Install frontend dependencies `npm install`
8. Start the development server `npm run dev`

## Status
Live (API integrations in progress)

## Live Demo
https://couvrant.vercel.app

