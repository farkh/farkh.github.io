export default function(array, className) {
	let menu = document.createElement('ul');
	menu.className = className;
	let listItems = '';
	array.forEach(item => {
		listItems += '<li>' + item + '</li>';
	});
	menu.innerHTML = listItems;

	return menu;
}
