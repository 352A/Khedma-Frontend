
# Khedma Frontend

Khedma is a platform designed to connect independent service providers with clients. The frontend of Khedma provides a user-friendly interface for both service providers and clients to interact seamlessly. It is built using React.js, Tailwind CSS, and integrates with various backend services to ensure smooth functionality.

## Table of Contents

- [Installation](#installation)
- [Technologies](#technologies)
- [Features](#features)
- [Folder Structure](#folder-structure)
- [Development](#development)
- [Contributing](#contributing)
- [License](#license)

## Installation

To get started with the Khedma frontend, clone the repository and install dependencies:

```bash
# Clone the repository
git clone https://github.com/your-username/khedma-frontend.git

# Navigate to the project folder
cd khedma-frontend

# Install dependencies
npm install
```

## Technologies

The Khedma frontend is built with the following technologies:

- **React.js** - JavaScript library for building user interfaces
- **Tailwind CSS** - Utility-first CSS framework for custom styling
- **React Router DOM** - Routing library for navigating between views
- **Framer Motion** - For adding animations and smooth transitions
- **Next UI** - A React UI library for beautiful and responsive components
- **Embla Carousel** - For creating carousels

## Features

- **Authentication**: Login and registration system for clients and service providers.
- **Service Categories**: Browse and filter services by category.
- **Search**: Search for service providers or specific services.
- **Responsive UI**: Optimized for both desktop and mobile screens.
- **Carousels**: Use Embla Carousel to showcase services and offers.
- **Multilingual Support**: User interface supports Arabic and English.
- **Admin Dashboard**: A limited feature for admins to manage the platform.

## Folder Structure

Here's an overview of the project folder structure:

```
khedma-frontend/
│
├── public/                 # Public assets like images and favicon
│
├── src/                   
│   ├── assets/             # Images, icons, etc.
│   ├── components/         # Reusable UI components
│   ├── context/            # Context API for global state management
│   ├── pages/              # React pages (e.g., Home, Login, Services)
│   ├── routes/             # Route definitions
│   ├── styles/             # Tailwind CSS configuration and custom styles
│   ├── utils/              # Helper functions and utilities
│   └── App.js              # Main React application component
│
├── tailwind.config.js      # Tailwind CSS configuration
├── postcss.config.js       # PostCSS configuration
└── package.json            # Project dependencies and scripts
```

## Development

To run the app in development mode, use the following command:

```bash
npm start
```

This will launch the app on `http://localhost:3000`.

### Run Tests

To run unit tests and check for linting issues:

```bash
npm test
```

### Build for Production

To create a production-ready build:

```bash
npm run build
```

This will create an optimized build in the `build/` folder.

## Contributing

We welcome contributions to the Khedma frontend. To contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Make your changes and commit them (`git commit -am 'Add new feature'`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Create a new Pull Request.

Please ensure that your code adheres to the project's code style and passes tests before submitting a PR.

## License

Khedma is open-source software, licensed under the [MIT License](LICENSE).
