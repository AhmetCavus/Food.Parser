const csv = require('csvtojson');
const fs = require('fs');

function fetchRaw(filename) {
    return new Promise((resolve, reject) => {
        fs.readFile(filename, 
            (err, data) => {
                if(err) {
                    reject(err);
                } else {
                    resolve(data);
                }
                return data;
            }
        );
    });
}

function fetchCsv(filename) {
    return new Promise((resolve, reject) => {
        fetchRaw(filename)
        .then(data => {
            var foods = [];
            csv({
                noheader: false,
                delimiter: ';'
            })
            .fromString(data)
            .on('json', food => {
                foods.push(food);
            })
            .on('done', () => {
                resolve(foods);
            });
        });
    });
}

function fetchJson(filename) {
    return new Promise((resolve, reject) => {
        fetchRaw(filename)
        .then(data => {
            resolve(JSON.parse(data));
        });
    });
}

module.exports = {
    fetchRaw: fetchRaw,
    fetchCsv: fetchCsv,
    fetchJson: fetchJson
};