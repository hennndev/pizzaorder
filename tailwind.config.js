module.exports = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            gridTemplateColumns: {
                'products': 'repeat(auto-fill, minmax(200px, 1fr))',
                'cards': 'repeat(auto-fill, minmax(300px, 1fr))',
                'products-mobile': 'repeat(auto-fill, minmax(150px, 1fr))'
            },
        },
    },
    plugins: [
        require('tailwind-scrollbar-hide')
    ],
}
