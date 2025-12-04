export const metadata = {
  title: 'Judge Cat: Court of Cuteness',
  description: 'Cute cat judge app',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Merriweather:ital,wght@0,300;0,400;0,700;1,300&family=Nunito:wght@400;600;700&family=Noto+Sans+SC:wght@400;500;700&display=swap" rel="stylesheet" />
        <script src="https://cdn.tailwindcss.com"></script>
        <script dangerouslySetInnerHTML={{ __html: `
          tailwind.config = {
            theme: {
              extend: {
                fontFamily: {
                  serif: ['Merriweather', 'serif'],
                  sans: ['Nunito', 'Noto Sans SC', 'sans-serif'],
                },
                colors: {
                  'cat-beige': '#FDFBF7',
                  'cat-brown': '#5D4037',
                  'cat-pink': '#FFCDD2',
                  'cat-pink-dark': '#E57373',
                }
              }
            }
          }
        ` }} />
        <style>{`
          body { background-color: #FDFBF7; color: #5D4037; }
          .wiggle { animation: wiggle 1s ease-in-out infinite; }
          @keyframes wiggle { 0%, 100% { transform: rotate(-3deg); } 50% { transform: rotate(3deg); } }
        `}</style>
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
