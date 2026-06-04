import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SITE } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Política de Privacidade",
  description:
    "Política de Privacidade do AchouPro. Saiba como coletamos, usamos e protegemos seus dados pessoais em conformidade com a LGPD.",
  robots: { index: true, follow: true },
};

const UPDATED_AT = "03 de junho de 2026";

export default function PrivacidadePage() {
  return (
    <>
      <Navbar />

      <main className="legal-page page-main" data-reveal>
        <div className="container">
          <header className="legal-head">
            <span className="section-tag">Documentos legais</span>
            <h1>Política de Privacidade</h1>
            <p>
              Última atualização: <strong>{UPDATED_AT}</strong>
            </p>
            <p style={{ maxWidth: 720, margin: "1rem auto 0" }}>
              Esta Política descreve como o AchouPro coleta, usa, armazena e
              protege seus dados pessoais, em conformidade com a{" "}
              <strong>
                Lei Geral de Proteção de Dados (Lei nº 13.709/2018)
              </strong>
              .
            </p>
            <nav className="legal-toc" aria-label="Sumário">
              <a href="#1">1. Controlador dos dados</a>
              <a href="#2">2. Dados coletados</a>
              <a href="#3">3. Finalidades do tratamento</a>
              <a href="#4">4. Bases legais</a>
              <a href="#5">5. Compartilhamento</a>
              <a href="#6">6. Armazenamento e segurança</a>
              <a href="#7">7. Tempo de retenção</a>
              <a href="#8">8. Seus direitos (LGPD)</a>
              <a href="#9">9. Cookies e rastreadores</a>
              <a href="#10">10. Crianças e adolescentes</a>
              <a href="#11">11. Alterações</a>
              <a href="#12">12. Contato e DPO</a>
            </nav>
          </header>

          <article className="legal-content">
            <section id="1">
              <h2>1. Controlador dos dados</h2>
              <p>
                O <strong>AchouPro</strong>, sediado em Aracaju/SE, é o
                Controlador dos dados pessoais coletados através da Plataforma,
                conforme definido pelo Art. 5º, VI, da LGPD.
              </p>
              <ul>
                <li>
                  <strong>Email do Encarregado (DPO):</strong>{" "}
                  <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
                </li>
                <li>
                  <strong>Contato:</strong>{" "}
                  <a
                    href={`https://wa.me/${SITE.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    WhatsApp (79) 99951-5563
                  </a>
                </li>
              </ul>
            </section>

            <section id="2">
              <h2>2. Quais dados coletamos</h2>

              <h3>2.1. Dados de Profissionais cadastrados</h3>
              <ul>
                <li>Nome completo</li>
                <li>CPF ou CNPJ (para verificação de identidade)</li>
                <li>Telefone / WhatsApp</li>
                <li>Email</li>
                <li>Endereço comercial (cidade e bairro)</li>
                <li>Foto de perfil e imagens de portfólio</li>
                <li>Descrição dos serviços prestados</li>
                <li>Anos de experiência</li>
              </ul>

              <h3>2.2. Dados de Clientes</h3>
              <p>
                Atualmente, o AchouPro <strong>não exige cadastro</strong> para
                Clientes pesquisarem profissionais. Para enviar avaliações,
                coletamos apenas:
              </p>
              <ul>
                <li>Nome (pode ser pseudônimo, ex.: &ldquo;Maria S.&rdquo;)</li>
                <li>Email (não é exibido publicamente)</li>
                <li>Comentário e nota atribuída</li>
              </ul>

              <h3>2.3. Dados coletados automaticamente</h3>
              <ul>
                <li>Endereço IP (anonimizado quando possível)</li>
                <li>Tipo de navegador e dispositivo</li>
                <li>Páginas visitadas e tempo de permanência</li>
                <li>Cookies (ver Seção 9)</li>
              </ul>
            </section>

            <section id="3">
              <h2>3. Para que usamos seus dados</h2>
              <ul>
                <li>
                  <strong>Operar a Plataforma:</strong> exibir perfis, processar
                  buscas, gerenciar avaliações;
                </li>
                <li>
                  <strong>Verificar identidade</strong> de Profissionais para
                  evitar fraudes;
                </li>
                <li>
                  <strong>Possibilitar contato direto</strong> entre Clientes e
                  Profissionais (via WhatsApp);
                </li>
                <li>
                  <strong>Melhorar a experiência</strong> com base em métricas de
                  uso anônimas;
                </li>
                <li>
                  <strong>Comunicar atualizações</strong> sobre o serviço,
                  alterações nos Termos e oportunidades relevantes;
                </li>
                <li>
                  <strong>Cumprir obrigações legais</strong> ou ordens judiciais.
                </li>
              </ul>
            </section>

            <section id="4">
              <h2>4. Bases legais para o tratamento</h2>
              <p>
                Tratamos dados pessoais com fundamento nas seguintes bases
                legais previstas no Art. 7º da LGPD:
              </p>
              <ul>
                <li>
                  <strong>Consentimento (Art. 7º, I):</strong> para envio de
                  comunicações de marketing e uso de cookies não essenciais;
                </li>
                <li>
                  <strong>Execução de contrato (Art. 7º, V):</strong> para
                  cadastro de Profissionais e operação da Plataforma;
                </li>
                <li>
                  <strong>Cumprimento de obrigação legal (Art. 7º, II):</strong>{" "}
                  para guarda de registros fiscais e atendimento a autoridades;
                </li>
                <li>
                  <strong>Legítimo interesse (Art. 7º, IX):</strong> para
                  prevenção de fraudes, segurança e melhoria do serviço.
                </li>
              </ul>
            </section>

            <section id="5">
              <h2>5. Com quem compartilhamos</h2>
              <p>
                O AchouPro <strong>não vende</strong> seus dados pessoais.
                Compartilhamos apenas com:
              </p>
              <ul>
                <li>
                  <strong>Provedores de infraestrutura</strong> (Hostinger,
                  serviços de email transacional) sob contrato de
                  confidencialidade e tratamento de dados;
                </li>
                <li>
                  <strong>Ferramentas de análise</strong> (Google Analytics) com
                  dados anonimizados;
                </li>
                <li>
                  <strong>Autoridades públicas</strong> quando exigido por lei,
                  ordem judicial ou para defesa de direitos.
                </li>
              </ul>
              <p>
                Os dados de contato dos Profissionais (telefone, WhatsApp) são
                <strong> exibidos publicamente</strong> com seu consentimento
                expresso no momento do cadastro, com a finalidade específica de
                permitir contato direto com Clientes.
              </p>
            </section>

            <section id="6">
              <h2>6. Como armazenamos e protegemos</h2>
              <p>
                Os dados são armazenados em servidores localizados no Brasil ou
                em provedores que cumpram padrões equivalentes à LGPD. Aplicamos
                medidas técnicas e administrativas para proteger seus dados:
              </p>
              <ul>
                <li>Conexão criptografada (HTTPS/TLS) em todo o site;</li>
                <li>Senhas armazenadas com hash bcrypt (irreversível);</li>
                <li>Acesso administrativo restrito e auditado;</li>
                <li>Backups automáticos diários;</li>
                <li>Atualizações regulares de segurança.</li>
              </ul>
            </section>

            <section id="7">
              <h2>7. Por quanto tempo mantemos</h2>
              <ul>
                <li>
                  <strong>Cadastro de Profissional ativo:</strong> enquanto a
                  conta estiver ativa;
                </li>
                <li>
                  <strong>Após cancelamento:</strong> até 5 anos para fins
                  fiscais e legais;
                </li>
                <li>
                  <strong>Avaliações publicadas:</strong> permanecem visíveis
                  enquanto o perfil do Profissional existir;
                </li>
                <li>
                  <strong>Logs de acesso:</strong> 6 meses (conforme Marco Civil
                  da Internet);
                </li>
                <li>
                  <strong>Dados anônimos para estatísticas:</strong> tempo
                  indeterminado.
                </li>
              </ul>
            </section>

            <section id="8">
              <h2>8. Seus direitos como titular</h2>
              <p>
                Conforme o Art. 18 da LGPD, você pode, a qualquer momento,
                solicitar:
              </p>
              <ul>
                <li>
                  <strong>Confirmação</strong> da existência de tratamento dos
                  seus dados;
                </li>
                <li>
                  <strong>Acesso</strong> aos dados que possuímos sobre você;
                </li>
                <li>
                  <strong>Correção</strong> de dados incompletos, inexatos ou
                  desatualizados;
                </li>
                <li>
                  <strong>Anonimização, bloqueio ou eliminação</strong> de dados
                  desnecessários ou tratados em desconformidade;
                </li>
                <li>
                  <strong>Portabilidade</strong> dos dados para outro fornecedor
                  de serviço;
                </li>
                <li>
                  <strong>Eliminação</strong> dos dados pessoais tratados com
                  base em consentimento;
                </li>
                <li>
                  <strong>Informação</strong> sobre com quem compartilhamos seus
                  dados;
                </li>
                <li>
                  <strong>Revogação do consentimento</strong> a qualquer momento.
                </li>
              </ul>
              <p>
                Para exercer qualquer direito, envie email para{" "}
                <a href={`mailto:${SITE.email}`}>{SITE.email}</a> com o assunto
                &ldquo;Solicitação LGPD&rdquo;. Responderemos em até{" "}
                <strong>15 (quinze) dias</strong>.
              </p>
            </section>

            <section id="9">
              <h2>9. Cookies e tecnologias semelhantes</h2>
              <p>Utilizamos cookies para:</p>
              <ul>
                <li>
                  <strong>Essenciais:</strong> manter sessão de login do admin,
                  preferências básicas;
                </li>
                <li>
                  <strong>Analíticos:</strong> medir tráfego e melhorar o site
                  (Google Analytics anonimizado);
                </li>
                <li>
                  <strong>Funcionais:</strong> lembrar filtros de busca e
                  preferências de exibição.
                </li>
              </ul>
              <p>
                Você pode gerenciar cookies a qualquer momento através das
                configurações do seu navegador. Note que desabilitar cookies
                essenciais pode comprometer funcionalidades.
              </p>
            </section>

            <section id="10">
              <h2>10. Crianças e adolescentes</h2>
              <p>
                O AchouPro <strong>não é direcionado a menores de 18 anos</strong>.
                Não coletamos intencionalmente dados de crianças ou
                adolescentes. Caso tomemos conhecimento de tal coleta, os dados
                serão excluídos imediatamente.
              </p>
            </section>

            <section id="11">
              <h2>11. Alterações nesta política</h2>
              <p>
                Esta Política pode ser atualizada periodicamente para refletir
                mudanças na legislação ou nas nossas práticas. Alterações
                materiais serão comunicadas por email aos Profissionais
                cadastrados com 15 (quinze) dias de antecedência.
              </p>
              <p>
                A data de &ldquo;última atualização&rdquo; no topo desta página
                indica a versão vigente.
              </p>
            </section>

            <section id="12">
              <h2>12. Encarregado de Proteção de Dados (DPO)</h2>
              <p>
                Para qualquer questão relacionada à privacidade ou aos seus
                direitos como titular, entre em contato com o Encarregado:
              </p>
              <ul>
                <li>
                  <strong>Email:</strong>{" "}
                  <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
                </li>
                <li>
                  <strong>WhatsApp:</strong>{" "}
                  <a
                    href={`https://wa.me/${SITE.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    (79) 99951-5563
                  </a>
                </li>
              </ul>
              <p style={{ marginTop: "2rem" }}>
                Você também pode apresentar reclamação à{" "}
                <a
                  href="https://www.gov.br/anpd/pt-br"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Autoridade Nacional de Proteção de Dados (ANPD)
                </a>
                .
              </p>
              <p style={{ marginTop: "1.5rem" }}>
                <Link href="/termos" className="legal-link">
                  Ver também: Termos de Uso →
                </Link>
              </p>
            </section>
          </article>
        </div>
      </main>

      <Footer />
    </>
  );
}
