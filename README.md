# Simple-matrix-communication-using-laser-arduino-and-javascript

Simple project that sends a Matrix and a hexadecimal sequence using a UI designed with HTML and JavaScript
and 2 arduinos corresponding to transmitter an receptor.


The hardware part was develop using 2 microporcessors arduino, a photocell for the reception and a laser of 3mW of Power
the project was tested sending an 8x10 matrix and 8 digit hexadecimal Sequence to a distance aprox to 50 meters

each symbol was code using ASCII and to define the end of the hexa and the beginning of the matrix (also to indicate de end of the matrix) the 'X' symbol was used
'N' was used to indicate a new line in the matrix.

Inside the index the draw matrix is for generate the sequence by drawing the matrix and the "Type the sequence" is the reception typing the string received and drawing the matrix.
