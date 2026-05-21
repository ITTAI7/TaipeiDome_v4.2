(async () => {
   try {
      console.log('Fetching games from /api/get_games...');
      const gamesRes = await fetch('http://localhost:3000/api/get_games');
      const gamesJson = await gamesRes.json();
      if (!gamesJson.games || gamesJson.games.length === 0) {
          console.log('No games found');
          return;
      }
      const firstGame = gamesJson.games[0];
      console.log('First game:', firstGame);
      
      console.log('Fetching tickets for first game...');
      const tixRes = await fetch(`http://localhost:3000/api/get_tickets?url=${encodeURIComponent(firstGame.link)}`);
      const tixJson = await tixRes.json();
      console.log('Tickets:', JSON.stringify(tixJson, null, 2));
   } catch(e) {
      console.error(e);
   }
})();
