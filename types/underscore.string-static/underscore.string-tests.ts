import * as _s from 'underscore.string';

_s.numberFormat(1000, 2);
_s.numberFormat(123456789.123, 5, '.', ',');

_s.levenshtein('kitten', 'kittah');

_s.capitalize('foo Bar');

_s.chop('whitespace', 3);

_s.clean(' foo    bar   ');

_s.chars('Hello');

_s.swapCase('hELLO');

_s.str.include('foobar', 'ob');

_s.count('Hello world', 'l');

_s.escapeHTML('<div>Blah blah blah</div>');

_s.unescapeHTML('&lt;div&gt;Blah blah blah&lt;/div&gt;');

_s.insert('Hello ', 6, 'world');

_s.isBlank('');
_s.isBlank('\n');
_s.isBlank(' ');
_s.isBlank('a');

_s.join(' ', 'foo', 'bar');

_s.lines('Hello\nWorld');

_s.str.reverse('foobar');

_s.splice('https://edtsech@bitbucket.org/edtsech/underscore.strings', 30, 7, 'epeli');

_s.startsWith('image.gif', 'image');

_s.endsWith('image.gif', 'gif');

_s.succ('a');
_s.succ('A');

_s.titleize('my name is epeli');

_s.camelize('-moz-transform');

_s.classify('some_class_name');

_s.underscored('MozTransform');

_s.dasherize('MozTransform');

_s.humanize('  capitalize dash-CamelCase_underscore trim  ');

_s.trim('  foobar   ');
_s.trim('_-foobar-_', '_-');

_s.truncate('Hello world', 5);
_s.truncate('Hello', 10);

_s.prune('Hello, world', 5);
_s.prune('Hello, world', 8);
_s.prune('Hello, world', 5, ' (read a lot more)');
_s.prune('Hello, cruel world', 15);
_s.prune('Hello', 10);

_s.words('   I   love   you   ');
_s.words('I_love_you', '_');
_s.words('I-love-you', /-/);
_s.words('   ');

_s.sprintf('%.1f', 1.17);

_s.pad('1', 8);
_s.pad('1', 8, '0');
_s.pad('1', 8, '0', 'right');
_s.pad('1', 8, '0', 'both');
_s.pad('1', 8, 'bleepblorp', 'both');

_s.lpad('1', 8, '0');

_s.rpad('1', 8, '0');

_s.toNumber('2.556');
_s.toNumber('2.556', 1);

_s.strRight('This_is_a_test_string', '_');

_s.strRightBack('This_is_a_test_string', '_');

_s.strLeft('This_is_a_test_string', '_');

_s.strLeftBack('This_is_a_test_string', '_');

_s.stripTags('a <a href="#">link</a>');
_s.stripTags('a <a href="#">link</a><script>alert("hello world!")</script>');

_s.toSentence(['jQuery', 'Mootools', 'Prototype']);
_s.toSentence(['jQuery', 'Mootools', 'Prototype'], ', ', ' unt ');

_s.toSentenceSerial(['jQuery', 'Mootools']);
_s.toSentenceSerial(['jQuery', 'Mootools', 'Prototype']);
_s.toSentenceSerial(['jQuery', 'Mootools', 'Prototype'], ', ', ' unt ');

_s.repeat('foo', 3);
_s.repeat('foo', 3, 'bar');

_s.surround('foo', 'ab');

_s.quote('foo');

_s.unquote('"foo"');
_s.unquote("'foo'", "'");

_s.slugify("Un éléphant à l'orée du bois");

['foo20', 'foo5'].sort(_s.naturalCmp);

_s.toBoolean('true');
_s.toBoolean('FALSE');
_s.toBoolean('random');
_s.toBoolean('truthy', ['truthy'], ['falsy']);
_s.toBoolean('true only at start', [/^true/]);
