/**
 * BinaryMuse toml adapter
 *
 * @see  https://github.com/BinaryMuse/toml-node
 * @param  {Toml} Toml toml parser
 */
export default function makeTomlReader(Toml) {
    return function tomlReader(file, cb) {
        return new Promise((resolve, reject) => {
            resolve(Toml.parse(file.contents.toString()))
        })
        .catch(e => {
            e.message = file.path + ', line ' + e.line + ', column ' + e.column + ': ' + e.message
            throw e
        })
    }
}
