module.exports = {
	// 最大行长
	printWidth: 100,
	// 指定每个缩进级别的空格数
	tabWidth: 2,
	// 使用制表符而不是空格缩进行
	useTabs: true,
	// 在语句的末尾打印分号
	semi: true,
	// 使用单引号而不是双引号
	singleQuote: true,
	// 引用对象中的属性时更改
	// "as-needed"- 仅在需要时在对象属性周围添加引号。
	// "consistent"- 如果对象中的至少一个属性需要引号，请引用所有属性。
	// "preserve"- 尊重对象属性中引号的输入使用。
	quoteProps: 'as-needed',
	// 在 JSX 中使用单引号而不是双引号
	jsxSingleQuote: false,
	// 在多行逗号分隔的句法结构中尽可能打印尾随逗号
	// "es5"- 在 ES5 中有效的尾随逗号（对象、数组等）。TypeScript 中的类型参数中没有尾随逗号。
	// "none"- 没有尾随逗号。
	// "all"- 尽可能使用尾随逗号（包括函数参数和调用）。要运行，以这种方式格式化的 JavaScript 代码需要一个支持 ES2017（Node.js 8+ 或现代浏览器）或下级编译的引擎。这还可以在 TypeScript 中的类型参数中启用尾随逗号（自 2018 年 1 月发布的 TypeScript 2.7 起支持）。
	trailingComma: 'es5',
	// 在对象文字中的括号之间打印空格
	bracketSpacing: true,
	// 将>多行 HTML（HTML、JSX、Vue、Angular）元素放在最后一行的末尾，而不是单独放在下一行（不适用于自闭合元素）
	bracketSameLine: true,

	// 在唯一的箭头函数参数周围包含括号。
	// always"- 始终包括括号。例子：(x) => x
	// "avoid"- 尽可能省略括号。例子：x => x
	arrowParens: 'avoid',

	// 仅格式化文件的一部分。
	// 这两个选项可用于格式化以给定字符偏移量开始和结束的代码（分别为包含和不包含）。范围将扩大：
	// 回到包含所选语句的第一行的开头。
	// 转发到所选语句的末尾。
	// 这些选项不能与 一起使用cursorOffset。
	// rangeStart: <int>
	// rangeEnd: <int>

	// 指定要使用的解析器。
	// Prettier 会自动从输入文件路径推断解析器，因此您不必更改此设置。
	// parser: "<string>"

	// 指定用于推断要使用的解析器的文件名。
	// filepath: "<string>"

	// 需要编译指示
	// Prettier 可以将自己限制为仅格式化文件顶部包含特殊注释（称为 pragma）的文件。这在将大型、未格式化的代码库逐渐过渡到 Prettier 时非常有用。
	// requirePragma: <bool>

	// 插入编译指示
	// insertPragma: <bool>

	// markdown 文本的换行
	// 默认情况下，Prettier 不会更改 markdown 文本的换行，因为某些服务使用换行敏感的渲染器，例如 GitHub 评论和 BitBucket。要让 Prettier 将散文包装到打印宽度，请将此选项更改为“始终”。如果您希望 Prettier 强制所有散文块在一行上并依赖编辑器/查看器软包装，您可以使用"never".
	// "always"- 如果散文超过打印宽度，则换行。
	// "never"- 将每个散文块展开成一行。
	// "preserve"- 什么都不做，让散文保持原样。首次在 v1.9.0 中可用
	proseWrap: 'preserve',
	// HTML 空白敏感性
	// 指定 HTML、Vue、Angular 和 Handlebars 的全局空格敏感性。有关详细信息，请参阅空格敏感格式。
	// "css"- 尊重 CSSdisplay属性的默认值。对于与处理相同的车把strict。
	// "strict"- 所有标签周围的空格（或缺少空格）被认为是重要的。
	// "ignore"- 所有标签周围的空白（或缺少它）被认为是微不足道的。
	htmlWhitespaceSensitivity: 'css',
	// Vue 文件脚本和样式标签缩进
	// 是否缩进 Vue 文件中的代码<script>和<style>标签。有些人（比如Vue 的创建者）不会缩进来保存缩进级别，但这可能会破坏编辑器中的代码折叠。
	// false- 不要在 Vue 文件中缩进脚本和样式标签。
	// true- 在 Vue 文件中缩进脚本和样式标签。
	vueIndentScriptAndStyle: false,
	// 行结束
	// "lf"– 仅换行 ( \n)，常见于 Linux 和 macOS 以及 git repos 内部
	// "crlf"- 回车 + 换行字符 ( \r\n)，常见于 Windows
	// "cr"- 仅回车字符 ( \r)，很少使用
	// "auto"- 保持现有的行尾（一个文件中的混合值通过查看第一行之后使用的内容进行标准化）
	endOfLine: 'auto',
	// 嵌入式语言格式
	// 控制 Prettier 是否格式化文件中嵌入的引用代码。
	// "auto"- 如果 Prettier 可以自动识别嵌入代码，请格式化它。
	// "off"- 永远不要自动格式化嵌入代码。
	embeddedLanguageFormatting: 'auto',
	// 每行单个属性
	// 在 HTML、Vue 和 JSX 中每行强制执行单个属性。
	// false- 不要每行强制执行单个属性。
	// true- 每行强制执行单个属性。
	singleAttributePerLine: false,
};
