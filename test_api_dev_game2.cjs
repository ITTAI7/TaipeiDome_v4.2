(async () => {
   try {
      console.log('Fetching games from /api/get_games...');
      const gamesRes = await fetch('http://localhost:3000/api/get_games');
      const gamesJson = await gamesRes.json();
      if (!gamesJson.games || gamesJson.games.length === 0) {
          console.log('No games found');
          return;
      }
      
      const game2 = gamesJson.games[1];
      console.log('Second game:', game2);
      
      console.log('Fetching tickets for second game...');
      const tixRes = await fetch(`http://localhost:3000/api/get_tickets?url=${encodeURIComponent(game2.link)}`);
      const tixJson = await tixRes.json();
      console.log('Tickets:', JSON.stringify(tixJson, null, 2).substring(0, 1500));
      
   } catch(e) {
      console.error(e);
   }
})();
