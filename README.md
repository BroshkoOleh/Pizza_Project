Toriiy

• Database and seeding: connected the database (PostgreSQL), designed the data structure (users, categories, products, price variations for different sizes and dough types, ingredients, cart, orders), implemented a script that populates the database with test data in a single run.

• Main page: products are fetched from the database. The list can be filtered by dough type, size, ingredients, and price range; filters in the sidebar are stored in the URL (the link can be shared — the same filter set will be opened). The “from / to” price inputs are synchronized with the range slider. Search: there is a live search in the header — while typing, suggestions are fetched from the database and users can navigate to the product page.

• Modal window: the same product can be opened in a modal over the catalog (without full page navigation); closing it returns the user back. In case of poor connection or page reload while the modal is open, the user is redirected to the product page that was previously opened in the modal. Implemented using Parallel Routes.

• Product page: a separate product page with data from the database. For pizza, users can select size, dough type, additional ingredients, and see the final price just like in the modal. Smart option selection: if a certain size is not available for the selected dough type, the interface automatically selects an available option to avoid an empty state.

Short summary: backend data and catalog, main page, filtering and search, product page and modal with pizza configuration.


_________________________________________________________________________________


Broshko Oleh

• Project setup — base configuration to ensure stable build and run of the application.

• Responsive layout: implemented full responsiveness across all screen sizes.

• Cart: implemented full cart business logic with server-side data — adding items (with selected ingredients), updating quantity, and removing items. Proper handling of identical products with different configurations. Toast notifications provide user feedback after actions.

• Checkout process: separate screens for cart → checkout → payment; forms with validation (ensuring correct email format, required fields, etc.).

• Delivery address: address input with map-based suggestions (external autocomplete service) to reduce manual input and errors.

• Order processing on the server: clicking “place order” creates an order on the server (more secure than client-only logic). Protection against duplicate orders if the user clicks multiple times or refreshes the page.

• Payments: Stripe integration (card payment via Stripe-hosted page). After payment, the server receives confirmation (webhook), updates order status, clears the cart, and can send a confirmation email.

• Emails: order and payment confirmation emails are sent via an email service (Brevo), e.g., payment link email or success confirmation.

• Deployment: deployed the project on Vercel with environment variables configuration (database, Stripe, email service), build setup, and verification of server-side logic in production.

Short summary: responsive UI, cart and its business logic, full checkout flow, Stripe and email integration, deployment and production environment handling.
