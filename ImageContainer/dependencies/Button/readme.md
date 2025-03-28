## Button
Создает и стилизует стандартизированную кнопку

Принимаемые пропсы
- ico - передается либо svg, либо react.component с картинкой
- children → текст. Так же может принимать объект, например div. В таком случае, стили должны быть прописаны самостоятельно
- widgets → элементы отображающиеся в правой части кнопки (счетчики, например)
- onBtnClick → функция которая назначает действие по клику кнопки
- hierarchy → иерархия кнопок. 1 — важная кнопка, 2 (по умолчанию) — просто кнопка, 3 — практически ссылка.

```jsx
<Button
	ico={
		<Image />
	}

	onBtnClick = {e => console.log("OK")}
	widgets = {[
		<div></div>,
		<div></div>,
		<div></div>,
	]}

	style={{
		background: "yellow",
	}}
	
	>{"Текст на кнопке"}
</Button>
```


## ButtonContainer
Предназначение - визуально группировать несколько кнопок. Скругляются края только у первой и последней кнопок, в то время как края кнопок содержащихся внутри списка края не имеют скругление.

Группирует по горизонтали и вертикали.

Содержит в children компоненты Button.