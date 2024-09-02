# Тестовая задача на Nuxt 3 + Composition API + Tailwind + TypeScript

## Описание проекта

Данный проект реализует веб-приложение на Nuxt 3, использующее Composition API, TailwindCSS и TypeScript. Основная цель — создание таблицы для просмотра постов, получаемых с сервиса [JSONPlaceholder](https://jsonplaceholder.typicode.com/), с поддержкой пагинации, сортировки и возможности создания новых постов.

## Основные возможности

- Просмотр списка постов с сервиса JSONPlaceholder, используя эндпоинт `/posts`.
- Пагинация по 10 элементов на страницу с индикатором загрузки (throbber).
- Сортировка таблицы по ID постов.
- Возможность создания нового поста через модальное окно.
- Хранение состояния (посты, загрузка) в менеджере состояния (например, Pinia).
- Чистая и аккуратная верстка с использованием TailwindCSS.

## Технологии

- **Nuxt 3** — фреймворк для создания серверных приложений на Vue.js.
- **Composition API** — современный подход к написанию компонентов в Vue.js.
- **TailwindCSS** — утилитарный CSS-фреймворк для создания адаптивного дизайна.
- **TypeScript** — строго типизированный язык, расширяющий JavaScript.
- **JSONPlaceholder API** — бесплатный API для тестирования и прототипирования.

## Установка и запуск

Выполните следующие действия:

1. Клонируйте репозиторий:

```bash
git clone https://github.com/arkadykorsakov/nuxt-task.git
```

2. Установите зависимости проекта:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

3. Запустите проект:

```bash
# npm
npm run dev

# pnpm
pnpm run dev

# yarn
yarn dev

# bun
bun run dev
```

4. Перейдите по ссылке `http://localhost:3000`
