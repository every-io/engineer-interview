import { ChallengeComponent } from "./ChallengeComponent";

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-600 text-white p-6">
        <div className="flex items-center ml-6">
          <h1 className="text-2xl font-bold">
            Welcome To The Every.io Code Challenge.
          </h1>
          <div className="ml-12">
            <a
              target="_blank"
              href="https://www.figma.com/proto/kd49ArXbBt0vi1kBSLkmC1/Code-Challenge?node-id=1%3A2&scaling=min-zoom&page-id=0%3A1"
              className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition-colors inline-block"
              rel="noreferrer"
            >
              Checkout the Prototype
            </a>
          </div>
        </div>
      </header>
      <main className="w-full max-w-[calc(100vw-50px)] mx-auto bg-gray-50 border border-black shadow-lg rounded-[40px] mt-4">
        <ChallengeComponent />
      </main>
    </div>
  );
}

export default App;
