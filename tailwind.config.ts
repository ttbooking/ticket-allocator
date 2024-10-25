import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";
import containerQueries from "@tailwindcss/container-queries";
import typography from "@tailwindcss/typography";

export default <Partial<Config>>{
    content: [
        "./vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php",
        "./storage/framework/views/*.php",
        "./resources/views/**/*.blade.php",
        "./resources/js/**/*.vue",
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ["Nunito", ...defaultTheme.fontFamily.sans],
                title: ["Lobster", ...defaultTheme.fontFamily.sans],
            },
        },
    },

    corePlugins: {
        preflight: false,
    },

    plugins: [containerQueries, typography],
};
