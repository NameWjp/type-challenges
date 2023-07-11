import type { Equal, Expect } from '@type-challenges/utils'

/**
 * 此答案参考出自：https://github.com/type-challenges/type-challenges/issues/27822
 * 个人认为此类题目意义不大，了解即可
 */

/*
  This type computes the absolute value of the input number,
  transforming negative numbers into their positive counterparts.
*/
type Abs<N extends number | string | bigint> = `${N}` extends `-${infer Num extends number}` ? `${Num}` : `${N}`;

/*
  LastDigit: Extracts the last digit from a numeric string.
*/
type LastDigit<S extends string> = S extends `${infer Rest}${0|1|2|3|4|5|6|7|8|9}` ? S extends `${Rest}${infer Digit}` ? Digit : never : never;

/*
  RestDigits: Retrieves all digits except the last from a numeric string.
*/
type RestDigits<S extends string> = S extends `${infer Rest}${0|1|2|3|4|5|6|7|8|9}` ? Rest : never;

/*
  This type multiplying each string-number in an array by 10.
*/
type MultiplyByTen<S extends string[]> = {[Index in keyof S]: S[Index] extends '0' ? '0' : `${S[Index]}0`};

/*
  This type calculates the product of two digits and multiplies the total products so far by ten.
  The multiplication is represented as appending zeros to the total strings.
  This type utilizes the MultiplicationMap to find the product of the digits.
  The result is an array where each string is a digit product with its appropriate tens-place offset.
*/
type ComputeProductWithOffset<LeftDigit extends string, UpDigit extends string, LeftTotal extends string[], UpTotal extends string[] = []> =
  MultiplicationMap[`${LeftDigit}x${UpDigit}` & keyof MultiplicationMap] extends infer Product extends string
    ? [...MultiplyByTen<UpTotal>, ...MultiplyByTen<LeftTotal>, Product]
    : [...MultiplyByTen<UpTotal>, ...MultiplyByTen<LeftTotal>];

/*
  This type, ComputeProductsAcrossRow, executes the multiplication for each digit pair along the row (left direction).
  It does so by recursively shifting to the left until it exhausts all digits in the row.
  It utilizes ComputeProductWithOffset to calculate the product of digits and carry over.
  The resulting array is a collection of string products, each appended with zeros to represent its tens-place offset.
*/
type ComputeProductsAcrossRow<Left extends string, UpDigit extends string> =
  '' extends Left
    ? []
    : ComputeProductWithOffset<LastDigit<Left>, UpDigit, ComputeProductsAcrossRow<RestDigits<Left>, UpDigit>>;

/*
  This type executes the multiplication process for each digit pair and then moves to the next row (up direction).
  It continues this operation until it traverses all the rows and columns of the number's digits.
*/
type ComputeProductsLeftward<Left extends string, Up extends string> =
  '' extends Left | Up
    ? []
    : ComputeProductWithOffset<LastDigit<Left>, LastDigit<Up>,
        ComputeProductsLeftward<Left, RestDigits<Up>>,
        ComputeProductsAcrossRow<RestDigits<Left>, LastDigit<Up>>>;

/*
  This type adds two numbers represented as strings.
  It recursively adds each digit from the least significant digit, and carries over as needed.
  Returns the sum as a string.
*/
type Sum<Num1 extends string, Num2 extends string> =
  Num1 extends '' | '0'
    ? Num2
    : Num2 extends '' | '0'
    ? Num1
    : AdditionMap[`${LastDigit<Num1>}+${LastDigit<Num2>}` & keyof AdditionMap] extends `${infer Carry}${infer Digit}`
      ? Sum<RestDigits<Num1>, RestDigits<Num2>> extends infer SumOfRest extends string
        ? `${Sum<SumOfRest, Carry>}${Digit}`
        : never
      : never;

/*
  This type, SumAllProducts, sums all elements in the input array of strings, which represent digit products offset by tens places.
  The summation takes place from right to left, emulating the carry-over process in manual addition.
  The result is a string representing the cumulative total.
*/
type SumAllProducts<ProductsWithOffset extends string[]> =
  ProductsWithOffset extends [infer FirstProduct extends string, ...infer RestProduct extends string[]]
    ? Sum<FirstProduct, SumAllProducts<RestProduct>>
    : '0';

/*
  Square is a type that calculates the square of a number.
  The result is then computed by concatenating the length of each diagonal.
*/
type Square<N extends number> =
  SumAllProducts<ComputeProductsLeftward<Abs<N>, Abs<N>>> extends infer Sum
    ? Sum extends `0${infer Num extends number}`
      ? Num
      : Sum extends `${infer Num extends number}`
        ? Num
        : 0
    : never;

/*
  AdditionMap is an object that maps an addition operation of two single-digit numbers to its result.
  The result is in string format to facilitate later string concatenation and maintain leading zeroes,
  which are crucial in the grid computation method we're implementing for squaring.
*/
type AdditionMap = {
  '0+0': '00', '0+1': '01', '0+2': '02', '0+3': '03', '0+4': '04', '0+5': '05', '0+6': '06', '0+7': '07', '0+8': '08', '0+9': '09',
  '1+0': '01', '1+1': '02', '1+2': '03', '1+3': '04', '1+4': '05', '1+5': '06', '1+6': '07', '1+7': '08', '1+8': '09', '1+9': '10',
  '2+0': '02', '2+1': '03', '2+2': '04', '2+3': '05', '2+4': '06', '2+5': '07', '2+6': '08', '2+7': '09', '2+8': '10', '2+9': '11',
  '3+0': '03', '3+1': '04', '3+2': '05', '3+3': '06', '3+4': '07', '3+5': '08', '3+6': '09', '3+7': '10', '3+8': '11', '3+9': '12',
  '4+0': '04', '4+1': '05', '4+2': '06', '4+3': '07', '4+4': '08', '4+5': '09', '4+6': '10', '4+7': '11', '4+8': '12', '4+9': '13',
  '5+0': '05', '5+1': '06', '5+2': '07', '5+3': '08', '5+4': '09', '5+5': '10', '5+6': '11', '5+7': '12', '5+8': '13', '5+9': '14',
  '6+0': '06', '6+1': '07', '6+2': '08', '6+3': '09', '6+4': '10', '6+5': '11', '6+6': '12', '6+7': '13', '6+8': '14', '6+9': '15',
  '7+0': '07', '7+1': '08', '7+2': '09', '7+3': '10', '7+4': '11', '7+5': '12', '7+6': '13', '7+7': '14', '7+8': '15', '7+9': '16',
  '8+0': '08', '8+1': '09', '8+2': '10', '8+3': '11', '8+4': '12', '8+5': '13', '8+6': '14', '8+7': '15', '8+8': '16', '8+9': '17',
  '9+0': '09', '9+1': '10', '9+2': '11', '9+3': '12', '9+4': '13', '9+5': '14', '9+6': '15', '9+7': '16', '9+8': '17', '9+9': '18',
};

/*
   MultiplicationMap is an object that maps a multiplication operation of two single-digit numbers to its result.
   Similar to AdditionMap, the result is in string format. This allows for easy string operations later and helps keep leading zeroes,
   which play a significant role in the positioning of the product results in our grid computation.
*/
type MultiplicationMap = {
  '0x0': '00', '0x1': '00', '0x2': '00', '0x3': '00', '0x4': '00', '0x5': '00', '0x6': '00', '0x7': '00', '0x8': '00', '0x9': '00',
  '1x0': '00', '1x1': '01', '1x2': '02', '1x3': '03', '1x4': '04', '1x5': '05', '1x6': '06', '1x7': '07', '1x8': '08', '1x9': '09',
  '2x0': '00', '2x1': '02', '2x2': '04', '2x3': '06', '2x4': '08', '2x5': '10', '2x6': '12', '2x7': '14', '2x8': '16', '2x9': '18',
  '3x0': '00', '3x1': '03', '3x2': '06', '3x3': '09', '3x4': '12', '3x5': '15', '3x6': '18', '3x7': '21', '3x8': '24', '3x9': '27',
  '4x0': '00', '4x1': '04', '4x2': '08', '4x3': '12', '4x4': '16', '4x5': '20', '4x6': '24', '4x7': '28', '4x8': '32', '4x9': '36',
  '5x0': '00', '5x1': '05', '5x2': '10', '5x3': '15', '5x4': '20', '5x5': '25', '5x6': '30', '5x7': '35', '5x8': '40', '5x9': '45',
  '6x0': '00', '6x1': '06', '6x2': '12', '6x3': '18', '6x4': '24', '6x5': '30', '6x6': '36', '6x7': '42', '6x8': '48', '6x9': '54',
  '7x0': '00', '7x1': '07', '7x2': '14', '7x3': '21', '7x4': '28', '7x5': '35', '7x6': '42', '7x7': '49', '7x8': '56', '7x9': '63',
  '8x0': '00', '8x1': '08', '8x2': '16', '8x3': '24', '8x4': '32', '8x5': '40', '8x6': '48', '8x7': '56', '8x8': '64', '8x9': '72',
  '9x0': '00', '9x1': '09', '9x2': '18', '9x3': '27', '9x4': '36', '9x5': '45', '9x6': '54', '9x7': '63', '9x8': '72', '9x9': '81',
};

type cases = [
  Expect<Equal<Square<0>, 0>>,
  Expect<Equal<Square<1>, 1>>,
  Expect<Equal<Square<3>, 9>>,
  Expect<Equal<Square<20>, 400>>,
  Expect<Equal<Square<100>, 10000>>,

  // Negative numbers
  Expect<Equal<Square<-2>, 4>>,
  Expect<Equal<Square<-5>, 25>>,
  Expect<Equal<Square<-31>, 961>>,
  Expect<Equal<Square<-50>, 2500>>,
]
