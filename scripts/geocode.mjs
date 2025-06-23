import fs from 'fs/promises';
import path from 'path';

const inputFile = path.join(process.cwd(), 'src', 'lieux-dits.json');
const outputFile = path.join(process.cwd(), 'src', 'lieux-dits.json');

// Simple delay function to respect API rate limits
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function geocodeAddresses() {
  try {
    const data = await fs.readFile(inputFile, 'utf-8');
    const lieuxDits = JSON.parse(data);
    const updatedLieuxDits = [];

    console.log(`Starting geocoding for ${lieuxDits.length} addresses...`);

    for (const ld of lieuxDits) {
      const address = ld.address;
      const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(address)}&format=json&limit=1`;

      console.log(`Fetching coordinates for: ${address}`);

      try {
        const response = await fetch(url, {
          headers: {
            'User-Agent': 'VillageAI/1.0 (for-local-development)'
          }
        });

        if (!response.ok) {
          console.error(`Error fetching data for ${address}: ${response.statusText}`);
          updatedLieuxDits.push(ld); // Keep old data on error
          await delay(1000); // Wait before next request
          continue;
        }

        const geocodeData = await response.json();

        if (geocodeData && geocodeData.length > 0) {
          const { lat, lon } = geocodeData[0];
          updatedLieuxDits.push({
            ...ld,
            latitude: parseFloat(lat),
            longitude: parseFloat(lon),
          });
          console.log(`  -> Found: lat=${lat}, lon=${lon}`);
        } else {
          console.warn(`  -> No coordinates found for: ${address}. Keeping original data.`);
          updatedLieuxDits.push(ld);
        }
      } catch (fetchError) {
        console.error(`Fetch error for ${address}:`, fetchError);
        updatedLieuxDits.push(ld); // Keep old data on fetch error
      }

      // Wait for 1 second before the next request to comply with Nominatim's usage policy
      await delay(1000);
    }

    await fs.writeFile(outputFile, JSON.stringify(updatedLieuxDits, null, 2), 'utf-8');
    console.log('Geocoding complete. File "src/lieux-dits.json" has been updated.');

  } catch (error) {
    console.error('An error occurred during the geocoding process:', error);
  }
}

geocodeAddresses();