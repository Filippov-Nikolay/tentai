export async function geocodeAddress(address, apiKey) {
    const response = await fetch(`https://api.openrouteservice.org/geocode/search?api_key=${apiKey}&text=${encodeURIComponent(address)}`);
    const data = await response.json();
    
    if (data && data.features && data.features.length > 0) {
        const [lon, lat] = data.features[0].geometry.coordinates;
        return [lon, lat]; // ORS требует именно [lon, lat]
    }

    throw new Error(`Не удалось найти координаты для: ${address}`);
}

export async function calculateORSMatrix(coordsList, apiKey) {
    const response = await fetch('https://api.openrouteservice.org/v2/matrix/driving-car', {
        method: 'POST',
        headers: {
            'Authorization': apiKey,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            locations: coordsList,
            metrics: ['distance'],
            units: 'km'
        })
    });

    const result = await response.json();
    return result;
}
