"use client";

export default function Home() {
    const navigateToGame = () => {
      window.location.href = "/game";
    };
  
    return (
      <div className="flex h-screen items-center justify-center bg-blue-200">
        <div className="text-center bg-white p-8 rounded-2xl shadow-lg">
          <h1 className="text-4xl font-bold text-blue-600 mb-4">Whack-a-Mole</h1>
          <p className="text-lg text-gray-700 mb-6">Are you ready to test your reflexes?</p>
          <button
            onClick={navigateToGame}
            className="px-6 py-3 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600 transition"
          >
            Start
          </button>
        </div>
      </div>
    );
  }
  