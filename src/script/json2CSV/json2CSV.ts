import path from 'path';
import {AsyncParser} from 'json2csv';
import {createReadStream, createWriteStream} from 'fs';

class Json2CSV {
  convert(
    inputFilePath: string,
    fields: string[],
    outputFilePath: string,
    transforms?: Array<Function>
  ) {
    const opts = {fields, transforms};
    const transformOpts = {highWaterMark: 8192};

    // Using the promise API
    const restaurantInput = createReadStream(
      path.join(__dirname, inputFilePath),
      {
        encoding: 'utf8',
      }
    );
    const restaurantOutput = createWriteStream(
      path.join(__dirname, outputFilePath),
      {
        encoding: 'utf8',
      }
    );

    const asyncParserInst = new AsyncParser(opts, transformOpts);
    const parsingProcessorUnit = asyncParserInst
      .fromInput(restaurantInput)
      .toOutput(restaurantOutput);

    return parsingProcessorUnit.promise();
  }
}

export default new Json2CSV();
