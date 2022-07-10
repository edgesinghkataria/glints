import path from 'path';
import {AsyncParser} from 'json2csv';
import {createReadStream, createWriteStream} from 'fs';

class Json2CSV {
  convert(filePath: string, fields: string[], outputFileName: string): void {
    const opts = {fields};
    const transformOpts = {highWaterMark: 8192};

    // Using the promise API
    const restaurantInput = createReadStream(path.join(__dirname, filePath), {
      encoding: 'utf8',
    });
    const restaurantOutput = createWriteStream(path.join(__dirname, filePath), {
      encoding: 'utf8',
    });
    const asyncParserInst = new AsyncParser(opts, transformOpts);
    const parsingProcessorUnit = asyncParserInst
      .fromInput(restaurantInput)
      .toOutput(restaurantOutput);

    parsingProcessorUnit.promise(false).catch((err: any) => console.error(err));
  }
}

export default new Json2CSV();
