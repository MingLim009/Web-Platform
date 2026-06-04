import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/admin/login",
  },
});

// Aplica APENAS em rotas protegidas (não pega /admin/login)
export const config = {
  matcher: [
    "/admin",
    "/admin/profissionais/:path*",
    "/admin/avaliacoes/:path*",
    "/admin/categorias/:path*",
    "/admin/cidades/:path*",
  ],
};
