// A detailed .jsx page to display the history of games with enhanced information and styling
function GameHistoryPage() {
    const games = [
      {
        id: 1,
        title: 'Chess',
        year: 1475,
        description: 'Chess originated in India and evolved from earlier strategy games. It represents a battle between two armies, emphasizing strategy and tactics.',
        details: 'The game gained popularity in Europe during the Middle Ages and has since become a cornerstone of intellectual games worldwide. Modern competitive chess emerged in the 19th century.'
      },
      {
        id: 2,
        title: 'Monopoly',
        year: 1935,
        description: 'Monopoly was created during the Great Depression and simulates real estate trading.',
        details: 'The game was initially designed to illustrate economic principles but has become a cultural icon, teaching players about money management and market dynamics.'
      },
      {
        id: 3,
        title: 'Pong',
        year: 1972,
        description: 'Pong was one of the first arcade video games and laid the foundation for the gaming industry.',
        details: 'Developed by Atari, Pong simulates table tennis and quickly became a commercial success, sparking the video game revolution of the 1970s.'
      },
      {
        id: 4,
        title: 'The Legend of Zelda',
        year: 1986,
        description: 'A groundbreaking fantasy action-adventure game with innovative gameplay and storytelling.',
        details: 'Created by Nintendo, the game introduced players to the expansive world of Hyrule and influenced countless adventure games with its open-world design and puzzle-solving mechanics.'
      },
      {
        id: 5,
        title: 'Minecraft',
        year: 2009,
        description: 'A sandbox game that allows players to build and explore virtual worlds.',
        details: 'Developed by Mojang, Minecraft became a global phenomenon due to its limitless creative possibilities and educational applications. It has also inspired a massive community of modders and content creators.'
      },
    ];
  
    return (
      <div style={styles.container}>
        <h1 style={styles.header}>History of Games</h1>
        <div style={styles.grid}>
          {games.map((game) => (
            <div key={game.id} style={styles.card}>
              <h2 style={styles.title}>{game.title}</h2>
              <p style={styles.year}>Year: {game.year}</p>
              <p style={styles.description}>{game.description}</p>
              <p style={styles.details}>{game.details}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }
  
  const styles = {
    container: {
      fontFamily: 'Arial, sans-serif',
      margin: '0 auto',
      padding: '20px',
      maxWidth: '900px',
      backgroundColor: '#f0f8ff',
      borderRadius: '10px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    },
    header: {
      textAlign: 'center',
      fontSize: '32px',
      marginBottom: '30px',
      color: '#333333',
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
      gap: '20px',
    },
    card: {
      backgroundColor: '#ffffff',
      padding: '20px',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
      transition: 'transform 0.2s, box-shadow 0.2s',
    },
    cardHover: {
      transform: 'scale(1.05)',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    },
    title: {
      fontSize: '22px',
      margin: '0 0 10px 0',
      color: '#1e90ff',
    },
    year: {
      fontSize: '16px',
      margin: '0 0 10px 0',
      fontStyle: 'italic',
      color: '#555555',
    },
    description: {
      fontSize: '14px',
      margin: '0 0 10px 0',
      color: '#666666',
    },
    details: {
      fontSize: '14px',
      margin: '0',
      color: '#444444',
    },
  };
  
  export default GameHistoryPage;
  