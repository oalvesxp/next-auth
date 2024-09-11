export default function GlobalStyle() {
  return (
    <style global jsx>{`
      body {
        font-family: sans-serif;
        background-color: #fafafa;
        height: 100vh;
        margin: 0;
      }

      h1 {
        font-size: 1.5rem;
        font-style: bold;
        color: #006799;
        text-align: center;
        padding-bottom: 15px;
      }

      p {
        text-align: center;
      }
    `}</style>
  )
}
