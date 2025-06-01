import type { Config } from "@react-router/dev/config";

// Function to generate random prerender routes
function generatePrerenderRoutes(): string[] {
  const routes: string[] = [];

  // Generate random auth testing args routes
  const names = ['juan', 'maria', 'carlos', 'ana', 'luis', 'sofia', 'diego', 'laura', 'pedro', 'valeria'];
  for (let i = 1; i <= 10; i++) {
    const randomName = names[Math.floor(Math.random() * names.length)];
    const randomAge = Math.floor(Math.random() * (40 - 18 + 1)) + 18; // Age between 18-40
    routes.push(`/auth/testing-args/${i}/${randomName}/${randomAge}`);
  }

  return routes;
}

export default {
  // Config options...
  // Server-side render by default, to enable SPA mode set this to `false`
  ssr: true,
  async prerender() {
    // Implement your prerender logic here
    return [
      '/auth/login',
      '/auth/register',
      '/auth/testing',

      // Products Prerender
      '/products/macbook',
      '/products/iphone',
      '/products/oneplus',

      // Generate random auth testing args routes
      ...generatePrerenderRoutes(),
    ];
  } 
} satisfies Config;
