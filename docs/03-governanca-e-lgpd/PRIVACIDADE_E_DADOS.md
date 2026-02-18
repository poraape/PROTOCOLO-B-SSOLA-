# PRIVACIDADE E DADOS — MVP INSTITUCIONAL

## 1) Escopo
Este documento descreve o estado atual do tratamento de dados no repositório e define medidas mínimas de mitigação para operação escolar responsável.

## 2) Quais dados existem no app hoje
### 2.1 Dados de configuração e conteúdo
- Dados institucionais da escola e emergência em `content/schoolConfig.ts`.
- Árvore de decisão, serviços e modelos em `content/protocolData.ts`.
- Conteúdos markdown de protocolo/anexos em `public/protocol/protocolo.md` e `public/anexos/*.md`.

### 2.2 Dados operacionais de uso local
- `pages/FlowPage.tsx` salva progresso/checklist em `localStorage` (`case_<id>`).
- `pages/GlossaryPage.tsx` salva glossário customizado em `localStorage`.

## 3) Onde os dados ficam
- No estado atual, não há backend próprio para dados de caso.
- Persistência ocorre localmente no navegador (quando usada).
- Conteúdo oficial é distribuído como arquivos estáticos do frontend.

## 4) Riscos do armazenamento atual
### 4.1 Riscos principais
- Exposição em dispositivo compartilhado (alto).
- Falta de trilha institucional auditável (alto).
- Ausência de controle de acesso por perfil (alto).
- Possível retenção indefinida de dados locais (médio/alto).

### 4.2 Classificação de risco
| Risco | Impacto | Probabilidade | Nível |
|---|---|---|---|
| Leitura indevida de `localStorage` em equipamento compartilhado | Alto | Médio | Alto |
| Perda de histórico por limpeza de navegador | Médio | Alto | Alto |
| Inexistência de auditoria formal de edição/acesso | Alto | Alto | Alto |

## 5) Boas práticas e mitigação (MVP)
1. Evitar salvar dados identificáveis no navegador.
2. Limpar dados locais após uso em dispositivos compartilhados.
3. Registrar casos formais no sistema oficial institucional aplicável.
4. Definir política mínima de acesso por função (mesmo antes de autenticação técnica).
5. Criar trilha de auditoria mínima (ver documento de trilha).

## 6) Retenção e descarte (política mínima sugerida)
- **Conteúdo do protocolo/anexos:** retenção por versão institucional vigente.
- **Dados temporários locais:** descarte imediato após transferência ao sistema oficial.
- **Logs de auditoria (futuro backend):** retenção conforme norma institucional e base legal aplicável.

## 7) Bases legais e referências internas
O repositório cita explicitamente LGPD e sigilo no material institucional, com obrigações de proteção e confidencialidade no contexto escolar.

**Evidência no repo:** `public/protocol/protocolo.md`, `public/anexos/anexos.md`.

## 8) Lacunas prioritárias
- ❗ Política de privacidade pública institucional (não encontrada).
- ❗ Canal formal de atendimento ao titular e governança DPO operacional (não implementado no app).
- ❗ Controle técnico de permissões por perfil (não encontrado).

## 9) Próximos passos
- P0: descontinuar persistência local de dados sensíveis.
- P1: autenticação + autorização por perfil.
- P1: trilha de auditoria com eventos mínimos.
- P2: procedimento de resposta a incidente de privacidade.
