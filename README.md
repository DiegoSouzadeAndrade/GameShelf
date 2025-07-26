🎮 GameShelf

    Organize, descubra e acompanhe seus jogos favoritos de forma elegante e intuitiva.

GameShelf é um aplicativo mobile desenvolvido em React Native (CLI) com TypeScript, que permite ao usuário pesquisar jogos através da API RAWG, organizá-los em coleções personalizadas (Jogando, Desejados e Finalizados), registrar horas jogadas e navegar em uma interface moderna com animações fluidas.

✨ Funcionalidades

    Pesquisa de Jogos: Integração com a RAWG API para buscar jogos populares.

    Coleções Personalizadas:

        Jogando

        Lista de Desejos

        Finalizados (com registro de horas jogadas)

    Detalhes do Jogo: Tela completa com capa, avaliação e data de lançamento.

    Animações Modernas: Transições suaves com Animated API.

    Internacionalização (i18n): Suporte a múltiplos idiomas (EN/PT).

    Design Responsivo: Interface elegante e intuitiva para Android.

🛠️ Tecnologias Utilizadas

    React Native CLI

    TypeScript

    Redux Toolkit + Redux Persist

    React Navigation

    react-i18next (i18n)

    RAWG API

    Animated API do React Native

🚀 Como Rodar o Projeto

1. Clonar o repositório

git clone https://github.com/DiegoSouzadeAndrade/GameShelf.git
cd GameShelf

2. Instalar dependências

npm install
# ou
yarn install

3. Configurar variáveis de ambiente

Adicione sua chave da RAWG API:

RAWG_API_KEY=SUA_CHAVE_AQUI

4. Rodar no Android

Certifique-se de ter o emulador ou dispositivo físico configurado:

npx react-native run-android

📂 Estrutura de Pastas

gameshelf/
├── android/
├── ios/
├── src/
│   ├── __mocks__/     # mocks para testes  
│   ├── __tests__/     # testes  
│   ├── api/        
│   ├── assets/        
│   ├── components/    # Componentes reutilizáveis
│   ├── hooks/         # Custom hooks
│   ├── i18n/          # Arquivos de i18n
│   ├── navigation/    
│   ├── screens/       # Telas do app
│   ├── store/         # Redux slices
│   ├── types/         # Tipagens TypeScript
│   └── utils/         


🖼️ Ícones e Splash Screen

    Ícones Android gerados e otimizados para mdpi, hdpi, xhdpi, xxhdpi e xxxhdpi.

    Splash screen responsivo e adaptado para múltiplas densidades de tela.

🔮 Roadmap

Dark Mode

UX aprimorada

Filtros avançados por gênero e plataforma

Backup/Sync na nuvem

    Compartilhamento de coleções

🤝 Contribuição

Contribuições são sempre bem-vindas!
Para contribuir:

    Crie uma branch (feature/nome-da-feature)

    Faça commit das alterações

    Abra um Pull Request
