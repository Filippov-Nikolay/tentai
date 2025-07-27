type Route = {
    title: string;
    point: string;
    isTrash: boolean;
    inputValue: string;
    hoursValue: number;
    distanceToNext: number | null;
}

export const calculateDistances = async(
    routes: Route[],
    setRoutes: (update: Route[]) => void,
    ORS_API_KEY: string
) => {
    try {
        console.log("API");

        const addresses = routes.map(r => r.inputValue).filter(Boolean);
        const coords = await Promise.all(addresses.map(addr => geocodeAddress(addr, ORS_API_KEY)));
        const matrix = await calculateORSMatrix(coords, ORS_API_KEY);
        const updatedRoutes = routes.map((route, index) => {
        let distanceToNext = route.distanceToNext;
            if (index < coords.length - 1) {
                const distance = matrix.distances[index][index + 1];
                distanceToNext = Number(distance.toFixed(2));
            } else {
                distanceToNext = -1;
            }

            return {
                ...route,
                distanceToNext,
            };
        });

        if (updatedRoutes.length > 0) {
            updatedRoutes[updatedRoutes.length - 1].distanceToNext = -1;
        }

        console.log(routes);

        if (JSON.stringify(routes) !== JSON.stringify(updatedRoutes)) {
            setRoutes(updatedRoutes);
        }
    } catch (error) {
        console.error("Ошибка при расчёте маршрута:", error);
    }
}

async function geocodeAddress(address: string, apiKey: string): Promise<[number, number]> {
    const response = await fetch(`https://api.openrouteservice.org/geocode/search?api_key=${apiKey}&text=${encodeURIComponent(address)}`);
    const data = await response.json();
    
    if (data && data.features && data.features.length > 0) {
        const [lon, lat] = data.features[0].geometry.coordinates;
        return [lon, lat]; // ORS требует именно [lon, lat]
    }

    throw new Error(`Не удалось найти координаты для: ${address}`);
}

async function calculateORSMatrix(coordsList: [number, number][], apiKey: string) {
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
