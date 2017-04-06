var favMovies = new Firebase('https://moviefire.firebaseio.com/movies');
 
function save() {
    
    var movieName = document.getElementById('movieName').value.trim();
    var movieAuthor = document.getElementById('movieAuthor').value.trim();
    var movieYear = document.getElementById('movieYear').value.trim();
        
    document.getElementById('movieName').value = '';
    document.getElementById('movieAuthor').value = '';
    document.getElementById('movieYear').value = '';
    
    favMovies.push({
        name: movieName,
        author: movieAuthor,
        year: movieYear
    });
};
 
function refreshInterface(list) {
    var lis = '';
    for (var i = 0; i < list.length; i++) {
        lis += '<li data-key="' + list[i].key + '">' + 'Filme: ' + list[i].name + ' - Autor: ' + list[i].author + ' - Ano: ' +list[i].year + ' [' + genLinks(list[i].key, list[i].name,list[i].author,list[i].year) + ']</li>';
    };
    document.getElementById('favMovies').innerHTML = lis;
};
 
function genLinks(key, Name, Author, Year) {
    var links = '';
    links += '<a href="javascript:editName(\'' + key + '\',\'' + Name + '\')">Editar nome</a> | ';
    links += '<a href="javascript:editAuthor(\'' + key + '\',\'' + Name + '\',\'' + Author +'\')">Editar autor</a> | ';
    links += '<a href="javascript:editYear(\'' + key + '\',\'' + Name + '\',\'' + Year + '\')">Editar ano</a> | ';
    links += '<a href="javascript:del(\'' + key + '\',\'' + Name + '\')">Remover</a>';
    return links;
};
 
function editName(key, Name) {
    var movieName = prompt("Atualizar o nome do filme \"" + Name + "\" :", Name); 
    if (movieName && movieName.length > 0) {
        var updateMovieRef = buildEndPoint(key);
        updateMovieRef.update({
            name: movieName
        });
    }
}

function editAuthor(key, Name, Author) {
    var movieAuthor = prompt("Atualizar o author do filme \"" + Name + "\" :", Author); 
    if (movieAuthor && movieAuthor.length > 0) {
        var updateMovieRef = buildEndPoint(key);
        updateMovieRef.update({
            author: movieAuthor
        });
    }
}

function editYear(key, Name, Year) {
    var movieYear = prompt("Atualizar o ano do filme \"" + Name + "\" :", Year); 
    if (movieYear && movieYear.length > 0) {
        var updateMovieRef = buildEndPoint(key);
        updateMovieRef.update({
            year: movieYear
        });
    }
}
 
function del(key, Name) {
    var response = confirm("Tem certeza que deseja remover o filme \"" + Name + "\" ?");
    if (response == true) {
        var deleteMovieRef = buildEndPoint(key);
        deleteMovieRef.remove();
    }
}
 
function buildEndPoint (key) {
	return new Firebase('https://moviefire.firebaseio.com/movies/' + key);
}
 
favMovies.on("value", function(snapshot) {
    var data = snapshot.val();
    var list = [];
    for (var key in data) {
        if (data.hasOwnProperty(key)) {
            name = data[key].name ? data[key].name : '';
            author = data[key].author ? data[key].author : '';
            year = data[key].year ? data[key].year : '';
            if (name.trim().length > 0 || author.trim().length > 0 || year.trim().length > 0) {
                list.push({
                    name: name,
                    author: author,
                    year: year,
                    key: key
                })
            }
        }
    }
    refreshInterface(list);
});