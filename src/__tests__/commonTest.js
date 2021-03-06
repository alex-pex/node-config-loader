import {loadConfig} from '../'
import assert from 'power-assert'

describe('commonMerger', () => {
    it('should merge server dev environments', () => {
        const testConfig = {
            example: {
                proc: 'example-dev-yaml',
                name: 'test-yaml',
                test: {
                    p2: 444,
                    p3: 534
                },
                test2: {
                    p2: 123
                },
                from: 'js',
                arrmerge: [
                    'test',
                    'test2'
                ]
            },
            app1: {
                arr: [
                    'test1',
                    'test2'
                ],
                proc: 'test-test'
            },
            console: {
                proc: 'test-dev',
                name: 'test'
            }
        }

        return loadConfig({
            mask: [__dirname + '/_main/**/*.{toml,tml,yaml,yml,json}', __dirname + '/{config,cfg/a}/**/*.{toml,tml,yaml,yml,json,js}'],
            instance: 'server',
            env: 'dev',
            hostname: 'testhost',
            tagSeparator: '#'
        })
            .then(loadedConfig => {
                assert.deepEqual(loadedConfig, testConfig)
            })
    })

    it('should merge client dev environments', () => {
        const testConfig = {
            example: {
                proc: 'example-dev-yaml',
                name: 'test-yaml',
                test: {
                    p2: 444,
                    p3: 534
                },
                arrmerge: [
                    'test',
                    'test2'
                ]
            },
            the: {
                test_string: 'You\'ll hate me after this - #'
            }
        }

        return loadConfig({
            mask: [
                __dirname + '/_main/**/*.{toml,tml,yaml,yml,json}',
                __dirname + '/config/**/*.{toml,tml,yaml,yml,json}'
            ],
            instance: 'client',
            env: 'dev',
            hostname: 'testhost',
            tagSeparator: '#'
        })
            .then(loadedConfig => {
                assert.deepEqual(loadedConfig, testConfig)
            })
    })
})
