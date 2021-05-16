const fs = require('fs');

const reader = require('xlsx');

const jsonFileName = "./website/public/data/data.json";
const file = reader.readFile("./assets/data/books.xlsx");

let data = {
    authors: [],
	genres: [],
    books:[],
}

function createAuthor(fullname) {
    let names = fullname.trim().split(" ");
    let firstName = "";
    let lastName = "";

    if (names.length > 2) {
        for(i=0; i < names.length - 1; i++) {
            firstName = firstName + names[i].trim() + " ";
        }

        firstName = firstName;
        lastName = names[names.length - 1];
    } else if (names.length == 2) {
        firstName = names[0];
        lastName = names[1];
    } else {
        firstName = "";
        lastName = fullname.trim();
    }

    if (firstName !== undefined) {
        firstName = firstName.trim();
    }

    if (lastName !== undefined) {
        lastName = lastName.trim();
    }

    let fullName = fullname.trim();
    
    let obj = {
        fullname: fullName,
        firstname: firstName,
        lastname: lastName
    };

    return obj;
}

let listOfAuthors = [];
let listOfGenres = [];
let tempAuthors = [];
let tempGenres = [];

// GET FIRST WORKSHEET
const temp = reader.utils.sheet_to_json(file.Sheets[file.SheetNames[0]]);

// LOOP THROUGH ROWS OF WORKSHEET
temp.forEach((res) => {
	if (res.Ignore !== undefined) {
		if (res.Ignore.length > 0) {
			return;
		}
	}

	let bookData = {
		title: "",
        price: 0.99,
		genres: [],
		authors: []
	};

	if (res.Title !== undefined) {
		bookData.title = res.Title.trim();
	}

    if (res.Price !== undefined) {
		bookData.price = res.Price;
	}
	
    // AUTHORS
	tempAuthors = [];

	if (res.Authors !== undefined) {
		tempAuthors = res.Authors.split(";");
	}

	// CHECK IF LIST ALREADY CONTAINS AUTHOR
	tempAuthors.forEach(author => {
        let authorObj = createAuthor(author);

        let found = listOfAuthors.some(item => item.fullname.trim() === authorObj.fullname.trim());

        // ADD AUTHOR TO GENERAL LIST OF AUTHORS
        if (found === false) {
            listOfAuthors.push(authorObj);
        }

        // ADD AUTHOR TO BOOK
        bookData.authors.push(authorObj);
	});

    // GENRES
    tempGenres = [];

    if (res.Genres !== undefined) {
		tempGenres = res.Genres.split(";");
	}

    tempGenres.forEach(genreObj => {
        genreObj = genreObj.trim();

        let found = listOfGenres.some(item => item === genreObj);

        // ADD AUTHOR TO GENERAL LIST OF AUTHORS
        if (found === false) {
            listOfGenres.push(genreObj);
        }

        // ADD AUTHOR TO BOOK
        bookData.genres.push(genreObj);
	});

	// ADD NEW BOOK
	data.books.push(bookData);
})


// SORT AUTHORS
listOfAuthors.sort(function(a,b) {
    if (a.lastname < b.lastname) {
        return -1;
    }
    if (a.lastname > b.lastname) {
    return 1;
    }
    return 0; 
});

// SORT GENRES
listOfGenres.sort(function(a,b) {
    if (a < b) {
        return -1;
    }
    if (a > b) {
    return 1;
    }
    return 0; 
});

// UPDATE PROPERTIES
data.genres = listOfGenres;
data.authors = listOfAuthors;

let jsonStr = JSON.stringify(data);

// WRITE JSON DATA TO FILE
fs.writeFile(jsonFileName, jsonStr, function (err) {
    if (err) return console.log(err);
    console.log('Completed Excel to JSON > ' + jsonFileName);
});
