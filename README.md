# Manga Reader Web App

A modern manga reader web application built with Next.js, TypeScript, Tailwind CSS, and Shadcn UI components. This application uses the MangaDex API to provide a clean, responsive interface for browsing and reading manga.

## Features

- **Modern UI**: Built with Tailwind CSS and Shadcn UI components
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Dark/Light Theme**: Automatic system theme detection with manual toggle
- **Manga Browsing**: Browse popular and latest manga
- **Search Functionality**: Search for manga by title
- **Manga Details**: View manga information, genres, and description
- **Chapter List**: Browse and select chapters to read
- **Vertical Reading**: Smooth vertical scroll reading experience
- **Page Navigation**: Keyboard shortcuts and on-screen controls

## Technologies Used

- **Next.js 14**: React framework with App Router
- **TypeScript**: Type-safe JavaScript
- **Tailwind CSS**: Utility-first CSS framework
- **Shadcn UI**: Re-usable UI components
- **MangaDex API**: Source for manga data

## Getting Started

### Prerequisites

- Node.js 18.17.0 or later

### Installation

1. Clone the repository
```bash
git clone https://your-repository-url/manga-reader.git
cd manga-reader
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

- `/src/app`: Next.js App Router pages and layouts
- `/src/components`: React components
- `/src/lib`: Utilities and API services
- `/public`: Static assets

## API Integration

This project uses the MangaDex API to fetch manga data. The API service is implemented in `/src/lib/api.ts` and includes methods for:

- Fetching manga lists
- Getting manga details
- Fetching chapter lists
- Getting chapter pages for reading

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- [MangaDex](https://api.mangadex.org/docs) for providing the API
- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Shadcn UI](https://ui.shadcn.com/)

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
