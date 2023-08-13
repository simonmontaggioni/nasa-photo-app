# NASA Photo App

The 'NASA Photo App' is a small application designed for those who are interested in observing the planet Mars through the eyes of exploratory rovers.

Using NASA's API, this app provides access to photos taken by the following rovers:

- Curiosity
- Opportunity
- Spirit

These rovers are equipped with a variety of cameras, offering users a diverse perspective of the Martian landscape.

## Installation

To get started, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/simonmontaggioni/nasa-photo-app.git
   ```

2. Navigate to the project folder:

   ```bash
   cd nasa-photo-app
   ```

3. Install project dependencies:

   ```bash
   npm install
   ```

## Usage

Once the dependencies are installed, you can use the project in the following ways:

- **Development Mode**: Launch the project in development mode by running:

  ```bash
  npm run dev
  ```

  This will open your default web browser with the app running at [http://localhost:3000](http://localhost:3000), allowing you to explore and enjoy photos captured on another planet.

## Important Note

The project is currently configured to use a **DEMO_API_KEY**. According to NASA's API documentation, this demo API key is limited to **30 requests per hour**. While suitable for development purposes, this rate might be insufficient for extensive use. To increase the request rate, it's recommended to obtain a private API key from NASA and replace the demo key with it in the **.env.local** file.

## Contributing

Contributions are welcome! If you're planning to make significant changes, please open an issue first to discuss your proposed changes.

Before submitting a pull request, ensure that you've updated and run relevant tests.

## License

This project is licensed under the [MIT License](https://choosealicense.com/licenses/mit/).
