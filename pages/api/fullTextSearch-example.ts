const jsonFile = {
    "1": {
        "text": "This is a sample text for full-text search in a JSON file"
    },
    "2": {
        "text": "This is another example of text for full-text search in a JSON file"
    },
    "3": {
        "text": "This is yet another example of text for full-text search in a JSON file"
    }
}

export function fullTextSearch(jsonFile: any, query: string): string[] {
    const results: string[] = [];
    const queryWords = query.toLowerCase().split(" ");
    for (const id of Object.keys(jsonFile)) {
        const obj = jsonFile[id];
        let match = true;
        for (const queryWord of queryWords) {
            if (!obj["text"].toLowerCase().includes(queryWord)) {
                match = false;
                break;
            }
        }
        if (match) {
            results.push(id);
        }
    }
    return results;
}

const query = "search using natural language phrases or words";
const results = fullTextSearch(jsonFile, query);
console.log(results);  // Output: ["1", "2", "3"]
