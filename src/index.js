import { RawSource } from "webpack-sources";
import MarkdownHandler from 'markdown-handler';


export default class MarkdownToJS {
    constructor(options = {}) {
        this.options = Object.assign(
            {
                outputPath: "md.js",
            },
            options
        );
    }

    sortPost = (mds, isDesc = true) => {
        mds = mds.sort((a, b) => {
            let dateA = new Date(a.metas.date);
            let dateB = new Date(b.metas.date);
            return isDesc ? dateB - dateA : dateA - dateB;
        })
        return mds;
    }

    apply(compiler) {
        // Specify the event hook to attach to
        compiler.hooks.emit.tapAsync(
            'RSSGeneratorPlugin',
            (compilation, callback) => {
                let mds = [];
                let mdHandler = new MarkdownHandler();
                let regex = /.*\.md$/gm;
                for (let path in compilation.assets) {
                    if (path.search(regex) >= 0) {
                        let md = compilation.assets[path].source().toString();
                        mds.push(mdHandler.parseContent(path, md));
                    }
                }
                mds = this.sortPost(mds, true);
                compilation.assets[this.options.outputPath] = new RawSource(JSON.stringify(mds));
                callback();
            }
        );


    }
}