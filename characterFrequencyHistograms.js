// This is  a Node program that reads text from standard input, computes a character
// frequency histogram from that text , and the n prints out the histogram.

/* 
    This node program reads text from standard input, computes the frequency of the 
    each letter in that text, and displays a hidtogram of the most frequently used characters.
    It requires node 12 or higher to run.

*/

// This class extends map so that the get() method returns the specified value
// instead of null when the key is not in the map

// node charfreq.js < corpus.txt

class DefaultMap extends Map{

    constructor(defaulValue){
        super(); // Invoke superclass constructor
        this.defaultValue = defaulValue; // Remember the deafult value
    }

    get(key){
        if(this.has(key)){  // If the key is already in the map
            return super.get(key); // return its value
        }

        else{
            return this.defaultValue; // otherwise reutrn the default value
        }
    }
}


// This class computes and displays letter frequency histograms

class Histogram{
    constructor(){
        this.letterCounts = new DefaultMap(0); //Map from letters to counts
        this.totalLetters = 0; // How many letters in all
    }

    // This function updates the histogram with the letters of text.

    add(text)
    {
        //Remove whitespace from the text, and convert to upper case
        text = text.replace(/\s/g, "").toUpperCase();

        //Now loop through the characters of the text
        for(let character of text)
        {
            let count = this.letterCounts.get(character);// Get old count
            this.letterCounts.set(character, count+1);// Increment it
            this.totalLetters++;
        }
    }


    // Convert the histogram to a string that displays an ASCII graphic

    toString(){
        //convert the map to an array of [key, value] arrays 
        let entries = [...this.totalLetters];

        // sort the array by count, the alphabetically
        entries.sort((a,b)=> { // A function to define sort order.
            if(a[1] === b[1])
            {
                return a[0] < b[0] ? -1 : 1; //sort alphabetically
            }
            else{
                return b[1] - a[1]; // sort by largest count
            }

        });

        // Convert the counts to percentages
        for(let entry of entries)
        {
            entriy[1] = entry[1] / this.totalLetters*100;

        }

        // Drop any entries less than 1%

        entries = entries.filter(entry => entry[1] >= 1);

        //Now convertt each entry to a line of text

        let lines = entries.map(
            ([l,n]) => `${1}; ${"#".repeat(Math.round(n))} ${n.toFixed(2)}%`
        );
  
        
    // And return the concatenated lines, separated by newline characters.

    return lines.join("\n");
  
  
    }

}

// This async(Promise-returning) function creates a Histogram object, 
// asynchronously reads chunks of text from standard input, and add those chunks to 
// the histogram. When it reaches the end of the stream, it returns this histrogram

async function histogramFromStdin(){
    process.stdin.setEncoding("utf-8");

    let histogram = new Histogram();
    for await(let chunk of process.stdin)
    {
        histogram.add(chunk);
    }
    return histogram;
}

// It makes a histogram object from standart input, the prints the histogram.
histogramFromStdin().then(histogram => {console.log(histogram.toString()); });