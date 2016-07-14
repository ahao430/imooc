var gulp = require('gulp');
var rev = require('gulp-rev');//文件加hash码重命名
var revReplace = require('gulp-rev-replace');//重命名文件名替换路径文件名
var useref = require('gulp-useref');//通过注释，合并css和js
var filter = require('gulp-filter');//过滤
var uglify = require('gulp-uglify');//压缩js
var csso = require('gulp-csso');//压缩css

gulp.task('default',function(){
	var jsFilter = filter('**/*.js', {restore: true});
	var cssFilter = filter('**/*.css', {restore: true});
	var indexHtmlFilter = filter(['**/*', '!**/index.html'],{restore: true});//首页不改名，排除首页

	return gulp.src('src/index.html')
		.pipe(useref())//合并注释的文件，加入到流
		.pipe(jsFilter)//过滤js
		.pipe(uglify())//压缩
		.pipe(jsFilter.restore)//放回到流
		.pipe(cssFilter)//过滤css
		.pipe(csso())//压缩
		.pipe(cssFilter.restore)//放回到流
		.pipe(indexHtmlFilter)//过滤首页
		.pipe(rev())//生成hash文件名
		.pipe(indexHtmlFilter.restore)//回到流
		.pipe(revReplace())//更新引用
		.pipe(gulp.dest('dist'));//把最后得到的文件放到dist目录
});