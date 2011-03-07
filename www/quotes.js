var quotes = [
        {
            quote : " The beginning of wisdom is to call things by their right names.",
            author : "Chinese Proverb"
        },
        {
            quote : "Proper names are poetry in the raw. Like all poetry they are untranslatable.",
            author : "W. H. Auden (1907-1973) English-born poet and man of letters"
        },
        {
            quote : "Names, once they are in common use, quickly become mere sounds, their"
                    + " etymology being buried, like so many of the earth's marvels, beneath the dust of habit.",
            author : "Salman Rushdie (1948-?) Anglo-Indian novelist."
        },
        {
            quote : "What's in a name? That which we call a rose by any other name would smell as sweet.",
            author : "William Shakespeare (1564-1616) British poet and playwright"
        },
        {
            quote : "We do what we must, and call it by the best names.",
            author : " Ralph Waldo Emerson quotes (American Poet, Lecturer and Essayist, 1803-1882)"
        },
        {
            quote : "Forgive your enemies, but never forget their names.",
            author : " John Fitzgerald Kennedy quotes (American 35th US President (1961-63), 1917-1963)"
        },
        {
            quote : "Names are not always what they seem. The common Welsh name BZJXXLLWCP is pronounced Jackson.",
            author : "Mark Twain (American Humorist, Writer and Lecturer. 1835-1910)"
        },
        {
            quote : "Fate tried to conceal him by naming him Smith.",
            author : "Oliver Wendell Holmes, Jr"
        },
        {
            quote : "Names are an important key to what a society values. Anthropologists recognize naming as"
                    + "\"one of the chief methods for imposing order on perception.\"",
            author : "David S. Slawson"
        },
        {
            quote : "If names are not correct, language will not be in accordance with the truth of things.",
            author : "Confucius"
        },
        {
            quote : "I have fallen in love with American names, the sharp, gaunt names that never get fat.",
            author : "Stephen Vincent Benet"
        },
        {
            quote : "No orator can top the one who can give good nicknames.",
            author : "Ralph Waldo Emerson quotes (American Poet, Lecturer and Essayist, 1803-1882)"
        } ];

function getRandomQuote() {
    var max = quotes.length;
    return quotes[Math.floor(Math.random()*max)];
}

//function testQuotes()
//{
//    for (i = 0; i < 10; i++) {
//        var q = getRandomQuote();
//        alert (q.quote + ' by ' + q.author);
//        
//    }
//}