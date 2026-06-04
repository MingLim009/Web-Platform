import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SITE } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Termos de Uso",
  description:
    "Termos e Condições de Uso da plataforma AchouPro. Leia atentamente antes de utilizar nossos serviços.",
  robots: { index: true, follow: true },
};

const UPDATED_AT = "03 de junho de 2026";

export default function TermosPage() {
  return (
    <>
      <Navbar />

      <main className="legal-page page-main" data-reveal>
        <div className="container">
          <header className="legal-head">
            <span className="section-tag">Documentos legais</span>
            <h1>Termos e Condições de Uso</h1>
            <p>
              Última atualização: <strong>{UPDATED_AT}</strong>
            </p>
            <nav className="legal-toc" aria-label="Sumário">
              <a href="#1">1. Aceitação dos termos</a>
              <a href="#2">2. Definições</a>
              <a href="#3">3. Cadastro e conta</a>
              <a href="#4">4. Responsabilidades dos usuários</a>
              <a href="#5">5. Programa Fundador</a>
              <a href="#6">6. Avaliações e comentários</a>
              <a href="#7">7. Propriedade intelectual</a>
              <a href="#8">8. Limitação de responsabilidade</a>
              <a href="#9">9. Suspensão e encerramento</a>
              <a href="#10">10. Alterações dos termos</a>
              <a href="#11">11. Lei aplicável</a>
              <a href="#12">12. Contato</a>
            </nav>
          </header>

          <article className="legal-content">
            <section id="1">
              <h2>1. Aceitação dos termos</h2>
              <p>
                Ao acessar ou utilizar a plataforma <strong>AchouPro</strong>
                {" "}(doravante &ldquo;Plataforma&rdquo;), disponível em{" "}
                <a href={SITE.url}>{SITE.url}</a>, você concorda integralmente com
                estes Termos e Condições de Uso. Caso não concorde com qualquer
                disposição, deve interromper imediatamente o uso da Plataforma.
              </p>
              <p>
                Estes termos constituem um contrato vinculante entre você e a
                AchouPro, regendo o acesso e o uso de todos os serviços,
                conteúdos e funcionalidades oferecidos.
              </p>
            </section>

            <section id="2">
              <h2>2. Definições</h2>
              <ul>
                <li>
                  <strong>Plataforma:</strong> o site AchouPro e todos os seus
                  serviços associados.
                </li>
                <li>
                  <strong>Usuário Cliente:</strong> pessoa física ou jurídica que
                  acessa a Plataforma para encontrar profissionais.
                </li>
                <li>
                  <strong>Profissional:</strong> pessoa física ou jurídica
                  cadastrada na Plataforma para oferecer serviços.
                </li>
                <li>
                  <strong>Conteúdo:</strong> textos, imagens, vídeos, avaliações
                  e qualquer material publicado na Plataforma.
                </li>
                <li>
                  <strong>Selo Fundador:</strong> identificação concedida aos 200
                  primeiros Profissionais cadastrados.
                </li>
              </ul>
            </section>

            <section id="3">
              <h2>3. Cadastro e conta</h2>
              <p>
                Para se cadastrar como Profissional, o usuário deve fornecer
                informações verdadeiras, completas e atualizadas, incluindo nome
                completo, documento de identificação (CPF ou CNPJ), telefone de
                contato e descrição dos serviços prestados.
              </p>
              <p>
                A AchouPro reserva-se o direito de verificar a autenticidade dos
                dados fornecidos e de recusar, suspender ou cancelar cadastros
                que apresentem informações falsas, incompletas ou suspeitas de
                fraude.
              </p>
              <p>
                O usuário é o único responsável pela guarda de suas credenciais
                de acesso, comprometendo-se a notificar imediatamente a AchouPro
                em caso de uso não autorizado.
              </p>
            </section>

            <section id="4">
              <h2>4. Responsabilidades dos usuários</h2>
              <p>
                <strong>O Usuário Cliente</strong> compromete-se a:
              </p>
              <ul>
                <li>Utilizar a Plataforma apenas para fins lícitos;</li>
                <li>
                  Tratar Profissionais com respeito, sem ofensas, ameaças ou
                  discriminação;
                </li>
                <li>
                  Fornecer avaliações honestas, baseadas em experiência real;
                </li>
                <li>Não tentar burlar ou prejudicar o funcionamento técnico.</li>
              </ul>
              <p>
                <strong>O Profissional</strong> compromete-se a:
              </p>
              <ul>
                <li>
                  Prestar os serviços com qualidade, dentro do prazo e do escopo
                  acordados diretamente com o Cliente;
                </li>
                <li>
                  Manter seus dados de contato atualizados e responder em prazo
                  razoável às solicitações;
                </li>
                <li>
                  Cumprir toda a legislação aplicável à sua atividade (licenças,
                  certificações, tributos);
                </li>
                <li>
                  Não criar perfis falsos, duplicados ou utilizar dados de
                  terceiros sem autorização.
                </li>
              </ul>
            </section>

            <section id="5">
              <h2>5. Programa Fundador</h2>
              <p>
                O Programa Fundador é uma promoção de lançamento destinada aos{" "}
                <strong>200 primeiros Profissionais</strong> que se cadastrarem
                na Plataforma. Os Fundadores recebem os seguintes benefícios:
              </p>
              <ul>
                <li>
                  <strong>Cadastro gratuito por 6 (seis) meses</strong> a contar
                  da data de aprovação do perfil;
                </li>
                <li>Selo dourado de Fundador, exibido permanentemente no perfil;</li>
                <li>Prioridade nos resultados de busca durante o período promocional;</li>
                <li>Destaque na página inicial.</li>
              </ul>
              <p>
                Após o período gratuito de 6 meses, a continuidade do cadastro
                estará sujeita às condições comerciais vigentes, que serão
                comunicadas com antecedência mínima de 30 (trinta) dias.
              </p>
              <p>
                A AchouPro reserva-se o direito de revogar o Selo Fundador em
                caso de violação destes Termos.
              </p>
            </section>

            <section id="6">
              <h2>6. Avaliações e comentários</h2>
              <p>
                Avaliações publicadas devem refletir experiências reais de
                contratação. É expressamente vedado:
              </p>
              <ul>
                <li>Publicar avaliações falsas, manipuladas ou automatizadas;</li>
                <li>
                  Utilizar linguagem ofensiva, discriminatória ou que promova
                  ódio;
                </li>
                <li>
                  Divulgar dados pessoais de terceiros sem consentimento;
                </li>
                <li>Realizar publicidade não autorizada de outros serviços.</li>
              </ul>
              <p>
                Todas as avaliações passam por moderação prévia. A AchouPro pode
                remover qualquer conteúdo que viole estes Termos ou a legislação
                vigente.
              </p>
            </section>

            <section id="7">
              <h2>7. Propriedade intelectual</h2>
              <p>
                Todos os direitos sobre a marca, logotipo, layout, código-fonte e
                materiais visuais da AchouPro pertencem à AchouPro, sendo vedada
                sua reprodução total ou parcial sem autorização prévia e por
                escrito.
              </p>
              <p>
                O conteúdo publicado pelos Profissionais permanece de sua
                propriedade, sendo concedida à AchouPro licença gratuita e não
                exclusiva para exibição na Plataforma, enquanto durar o cadastro.
              </p>
            </section>

            <section id="8">
              <h2>8. Limitação de responsabilidade</h2>
              <p>
                A AchouPro atua como <strong>intermediadora</strong> entre
                Clientes e Profissionais, <strong>não sendo parte</strong> nas
                relações contratuais firmadas entre eles. Em consequência, a
                AchouPro não se responsabiliza por:
              </p>
              <ul>
                <li>Qualidade, prazo, preço ou execução dos serviços prestados;</li>
                <li>Disputas, danos ou prejuízos decorrentes da contratação;</li>
                <li>
                  Veracidade de informações prestadas por Profissionais ou
                  Clientes;
                </li>
                <li>
                  Indisponibilidade temporária da Plataforma por motivos técnicos
                  ou de força maior.
                </li>
              </ul>
              <p>
                Recomendamos sempre verificar credenciais, exigir orçamentos
                detalhados e formalizar acordos por escrito.
              </p>
            </section>

            <section id="9">
              <h2>9. Suspensão e encerramento</h2>
              <p>
                A AchouPro pode, a seu critério e a qualquer momento, suspender
                ou encerrar contas que violem estes Termos, sem prejuízo das
                medidas legais cabíveis. Casos típicos incluem:
              </p>
              <ul>
                <li>Fornecimento de informações falsas no cadastro;</li>
                <li>
                  Reclamações reiteradas e comprovadas sobre a qualidade do
                  serviço;
                </li>
                <li>Uso da Plataforma para atividades ilícitas;</li>
                <li>Tentativas de burla técnica ou comercial.</li>
              </ul>
            </section>

            <section id="10">
              <h2>10. Alterações dos termos</h2>
              <p>
                A AchouPro pode atualizar estes Termos a qualquer momento,
                publicando a nova versão nesta página com a data de atualização
                em destaque. Alterações significativas serão comunicadas por
                email aos Profissionais cadastrados, com antecedência mínima de
                15 (quinze) dias.
              </p>
              <p>
                O uso continuado da Plataforma após a publicação implica
                aceitação tácita dos novos Termos.
              </p>
            </section>

            <section id="11">
              <h2>11. Lei aplicável e foro</h2>
              <p>
                Estes Termos são regidos pelas leis da República Federativa do
                Brasil, em especial pelo Código de Defesa do Consumidor (Lei nº
                8.078/1990), pelo Marco Civil da Internet (Lei nº 12.965/2014) e
                pela Lei Geral de Proteção de Dados (Lei nº 13.709/2018).
              </p>
              <p>
                Fica eleito o foro da Comarca de Aracaju, Estado de Sergipe, para
                dirimir quaisquer controvérsias, renunciando as partes a qualquer
                outro, por mais privilegiado que seja.
              </p>
            </section>

            <section id="12">
              <h2>12. Contato</h2>
              <p>
                Dúvidas, sugestões ou solicitações relacionadas a estes Termos
                podem ser enviadas para:
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
                <Link href="/privacidade" className="legal-link">
                  Ver também: Política de Privacidade →
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
