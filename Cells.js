process.stdin.setEncoding('utf-8');
var input_stdin_array = [];
var length_in = -1;

console.log("Hello, please input a square matrix of cells:\n");
process.stdin.on('readable',function()
{
    var vText = process.stdin.read();
    if(input_stdin_array.length === 0) length_in = vText.split("").length - 1;
    if (vText != null) input_stdin_array.push(vText.replace("\n",""));
    if(--length_in === 0) 
        main();
});

function get_board()
{
    let board = [],
        tmp_row, //locality?
        required_length = input_stdin_array.length,
        valid = true;
    for(let row of input_stdin_array)
    {
        tmp_row = row.split("").map(Number);
        if(tmp_row.length === required_length)
            {board.push(tmp_row);}
        else
        {
            valid = false;
            break;
        }
    }
    // minimal input validation
    if([].concat(... board).every(num => num === 0 || num === 1) && valid)
        {return board;}
    //otherwise
    console.log("Sorry, that board is invalid.");
    process.exit(1);
}

function evaluate_neighbors(array, fill_array, row, col)
{
    for(let x = Math.max(0, row - 1); x < Math.min(row + 2, array.length); x++) // + 2 bc excludes end index
    {
        for(let y = Math.max(0, col - 1); y < Math.min(col + 2, array.length); y++) //  + 2 bc excludes end index
        {
            if(x !== row || y !== col) // valid neighbor (not out of bounds)
            {
                if(array[row][col] > 0)
                {
                    //keep track of living neighbors for living and dead cells
                    fill_array[x][y] += array[x][y] === 1 ? 1 : -1; // dead cells have neg values
                }
            }
        }
    }
}

function evaluate_map(board)
{
    let new_board = Array(board.length).fill().map(() => Array(board.length).fill(0)), // initialize empty board
        cells = NaN; //locality? lol
    for(let row = 0; row < board.length; row++)
    {
        for(let col = 0; col < board[row].length; col++)
        {
            // decide if cell lives or dies, Roman emperor style
            cells = board[row][col]; // locality? lol
            if( cells === 2 || Math.abs(cells) === 3)
                {new_board[row][col] = 1;}
        }
    }
    return new_board;
}

function time_lapse(board)
{
    let board_map = Array(board.length).fill().map(() => Array(board.length).fill(0)); // create blank board
    for(let row = 0; row < board.length; row++)
    {
        for(let num = 0; num < board[row].length; num++)
        {
            evaluate_neighbors(board, board_map, row, num); // pass the board_map, update neighbor values
        }
    }
    return evaluate_map(board_map);
}
function print(board)
{
    for(let row of board)
    {
        for(let num of row)
        {
            process.stdout.write(num.toString());
        }
        console.log();
    }
}
function main()
{
    let board = get_board(),  // get input, assuming that board is square
        next_gen = time_lapse(board);
    print(next_gen);
    process.exit(0);
}
