const fs = require('fs');


const example = {
    t: 0, // type
        // 0 - folder
        // 1 - filter
        // 2 - form
		// 3 - folder+filter
    n: "Имя folder, filter or form",
    d: "description",
    k: "слова по которым будут искаться фильтры",
    q1: "запрос",
    q2: "содержательная часть запроса",
    p: 25, // родитель данного фильтра
    i: 42, // собственный id
    mx: [141, 458], // min / max значения, которые можно установить в форму
    ns: "дн", // единица измерения в которой в form задаются значения
    c: {}, // объект картинки иллюстрирующий фильтр
}


const harvesting = `

- номенклатура [folder]
	- растения для огорода [folder] Растения, которые выращивают в открытом грунте для получения пищевых продуктов, как правило в качестве однолетней культуры.
		- (↓) список таксонов у которых растения в поле zoning == 'огород' [filter]
		- томат [filter] {"q1": "taxon=", "q2": 1}
		- картофель [filter] {"q1": "taxon=", "q2": 2}
		- морковь [filter] {"q1": "taxon=", "q2": 3}
		- свекла [filter]  {"q1": "taxon=", "q2": 4}
		- капуста [filter]  {"q1": "taxon=", "q2": 5}
		- огурец [filter]  {"q1": "taxon=", "q2": 6}
		- лук [filter]  {"q1": "taxon=", "q2": 7}
		- чеснок [filter]  {"q1": "taxon=", "q2": 8}
	- растения для сада [folder] Растения, как правило, крупногабаритные и многолетние, которые выращивают для получения пищевых продуктов.
		- (↓) список таксонов у которых растения в поле zoning == 'сад' [filter]
		- яблоня [filter] {"q1": "taxon=", "q2": 9}
		- слива [filter] {"q1": "taxon=", "q2": 10}
		- смородина черная [filter] {"q1": "taxon=", "q2": 11}
		- смородина красная [filter] {"q1": "taxon=", "q2": 12}
	- растения для теплицы [folder] Растения, которые выращивают в специальном сооружении, в котором создается идеальный микроклимат для их роста и плодоношения. Для некоторых растений теплица является единственной возможность гарантированно получить урожай.
		- (↓) список таксонов у которых растения в поле zoning == 'закрытый грунт' [filter]
		- огурец [filter] {"q1": "taxon=", "q2": 6}
		- томат [filter] {"q1": "taxon=", "q2": 1}
		- баклажан [filter] {"q1": "taxon=", "q2": 15}
		- перец [filter] {"q1": "taxon=", "q2": 16}
		- клубника [filter] {"q1": "taxon=", "q2": 17}
	- декоративные растения [folder] Растения, которые выращивают для украшения садов, парков, скверов и других участков городских и сельских территорий, предназначенных для отдыха. 
		- (↓) список таксонов у которых растения в поле zoning == 'живая изгородь', 'газон' и пр [filter] но не цветы
		- геликония [filter] {"q1": "taxon=", "q2": 18}
		- неомарика [filter] {"q1": "taxon=", "q2": 19}
		- пентас [filter] {"q1": "taxon=", "q2": 20}
		- бальзамин [filter] {"q1": "taxon=", "q2": 21}
		- бегония [filter] {"q1": "taxon=", "q2": 22}
		- кардамон [filter] {"q1": "taxon=", "q2": 23}
		- калатея [filter] {"q1": "taxon=", "q2": 24}
		- камелия [filter] {"q1": "taxon=", "q2": 25}
		- тамариск [filter] {"q1": "taxon=", "q2": 26}
		- тис [filter] {"q1": "taxon=", "q2": 27}
		- мирсина [filter] {"q1": "taxon=", "q2": 28}
		- подокарпус [filter] {"q1": "taxon=", "q2": 29}
		- ирезине [filter] {"q1": "taxon=", "q2": 30}
		- осока [filter] {"q1": "taxon=", "q2": 31}
		- хаконехлоя [filter] {"q1": "taxon=", "q2": 32}
		- седум [filter] {"q1": "taxon=", "q2": 33}
		- офиопогон [filter] {"q1": "taxon=", "q2": 34}
		- скирпус [filter] {"q1": "taxon=", "q2": 35}
	- пряные растения [folder] Растения, которые накапливают ароматические или островкусовые вещества в своих частях, таких как листья, цветы, плоды, семена, корни или кора. Пряные растения используют для придания вкуса и аромата пище, напиткам, кондитерским изделиям и т.д. Также пряные растения могут иметь лечебные свойства и влиять на пищеварение, аппетит, настроение и т.д.
		- (↓) список таксонов у которых растения в поле zoning == 'пряная грядка' [filter]
		- базилик [filter] {"q1": "taxon=", "q2": 36}
		- укроп [filter] {"q1": "taxon=", "q2": 37}
		- петрушка [filter] {"q1": "taxon=", "q2": 38}
		- мята [filter] {"q1": "taxon=", "q2": 39}
		- эстрагон [filter] {"q1": "taxon=", "q2": 40}
		- лаванда [filter] {"q1": "taxon=", "q2": 41}
		- шалфей [filter] {"q1": "taxon=", "q2": 42}
		- розмарин [filter] {"q1": "taxon=", "q2": 43}
		- гвоздика [filter] {"q1": "taxon=", "q2": 44}
		- имбирь [filter] {"q1": "taxon=", "q2": 45}
		- кардамон [filter] {"q1": "taxon=", "q2": 46}
	- лекарственные растения [folder] Растения, которые содержат в своих частях биологически активные вещества, которые могут оказывать лечебное или профилактическое действие на организм человека.
		- (↓) список таксонов у которых растения в поле zoning == 'аптечная грядка' [filter]
		- боярышник [filter] {"q1": "taxon=", "q2": 47}
		- брусника [filter] {"q1": "taxon=", "q2": 48}
		- шиповник [filter] {"q1": "taxon=", "q2": 49}
		- черноплодная рябина [filter] {"q1": "taxon=", "q2": 50}
		- береза [filter] {"q1": "taxon=", "q2": 51}
		- липа [filter] {"q1": "taxon=", "q2": 52}
		- дуб [filter] {"q1": "taxon=", "q2": 53}
		- ива [filter] {"q1": "taxon=", "q2": 54}
	- комнатные растения [folder] Растения, которые выращивают в комнатах и в общественных помещениях. Большинство комнатных растений происходит из тропиков и субтропиков, поэтому им требуются тепло, свет и влажность. Комнатные растения могут украшать интерьер, очищать воздух, создавать уют и спокойствие. Некоторые комнатные растения также имеют лечебные или ароматические свойства.
		- (↓) список таксонов у которых растения в поле zoning == 'для подоконника' [filter]
		- алоэ [filter] {"q1": "taxon=", "q2": 55}
		- лаванда [filter] {"q1": "taxon=", "q2": 56}
		- бегония [filter] {"q1": "taxon=", "q2": 57}
- характеристики [folder]
	- место на участке [folder] Разные зоны участка создают разные условия для растений, и у разных растений есть разные требования к этим условиям.
		- (↓) список всех значений из поля zoning [filter] zone
		- для огородных грядок [filter] {"q1": "zone=", "q2": 1}
		- для контейнеров [filter] {"q1": "zone=", "q2": 2}
		- для солнечного участка [filter] {"q1": "zone=", "q2": 3}
		- для парников и теплиц [filter] {"q1": "zone=", "q2": 4}
		- для открытого грунта [filter] {"q1": "zone=", "q2": 5}
		- для шпалеры [filter] {"q1": "zone=", "q2": 6}
		- для притененного участка [filter] {"q1": "zone=", "q2": 7}
		- для прохладного климата [filter] {"q1": "zone=", "q2": 8}
		- для пряной грядки [filter] {"q1": "zone=", "q2": 9}
		- для теплого климата [filter] {"q1": "zone=", "q2": 10}
		- для аптечной грядки [filter] {"q1": "zone=", "q2": 11}
		- для ландшафтного дизайна [filter] {"q1": "zone=", "q2": 12}
		- для оранжереи [filter] {"q1": "zone=", "q2": 13}
		- для тенистого участка [filter] {"q1": "zone=", "q2": 14}
		- для сада [filter] {"q1": "zone=", "q2": 15}
	- использование растения [folder] Применение растений или их частей для разных целей человека
		- (↓) список всех значений из поля using [filter]
		- пищевое применение [folder] Растения или их части употребляются в пищу как источники углеводов, белков, жиров, витаминов, минералов, пряностей и других питательных и вкусовых веществ
			- для салатов [filter] Холодное блюдо, состоящее из одного вида или смеси разных видов сочетающихся между собой нарезанных продуктов в заправке. Салаты готовят из сырых и варёных овощей, консервированных и маринованных фруктов, плодов, ягод, грибов, в салаты также добавляют варёные яйца, отварные или жареные мясо, птицу, рыбу и морепродукты {"q1": "using=", "q2": 1}
			- витаминный рацион [filter] Витаминный рацион это режим питания, который обеспечивает достаточное поступление витаминов в организм для поддержания здоровья и иммунитета {"q1": "using=", "q2": 2}
			- для консервирования [folder] Консервирование это способ обработки пищевых продуктов с целью последующего длительного их хранения. Консервирование основано на уничтожении или подавлении микроорганизмов, вызывающих порчу продуктов, а также на предотвращении доступа кислорода и света. Консервирование может быть термическим (стерилизация, пастеризация), химическим (засолка, маринование, сахарение) или физическим (сушка, замораживание). Консервирование позволяет сохранить питательные и вкусовые свойства продуктов, а также расширить их ассортимент и сезонность {"q1": "using=", "q2": 3}
				- для засолки [filter] Засолка — способ консервирования при помощи соли, высокое содержание которой в продуктах затрудняет развитие бактерий и плесени, продукты жизнедеятельности которых делают пищу несъедобной для человека либо приводят к порче непищевых продуктов. Засолка придает продуктам новые вкусовые качества и позволяет сохранить их питательные и полезные свойства {"q1": "using=", "q2": 4}
				- для маринования [filter] Маринование — способ консервирования пищевых продуктов, основанный на действии кислоты, которая в определённых концентрациях (и особенно в присутствии поваренной соли) подавляет жизнедеятельность многих микроорганизмов. Маринование также придаёт продуктам новые вкусовые и ароматические качества, а также размягчает их. Маринование может быть химическим (с использованием уксусной или лимонной кислоты) или биологическим (с использованием молочнокислых бактерий). {"q1": "using=", "q2": 5}
				- для сахарения [folder] Сахарение — способ консервирования пищевых продуктов, основанный на действии сахара, который создает высокую осмолярность и не позволяет развиваться микроорганизмам. Сахарение также придаёт продуктам сладкий вкус и аромат. {"q1": "using=", "q2": 6}
					- для варенья и джемов [filter] {"q1": "using=", "q2": 7}
				- для дегидратации [filter] Дегидратация — это процесс высушивания или удаления воды из пищевых продуктов с целью их консервации. Дегидратация продуктов позволяет уменьшить их массу и объем, увеличить срок хранения, сохранить питательные и вкусовые свойства. Дегидратация продуктов может быть естественной (с использованием солнечного тепла и ветра) или искусственной (с использованием специальных сушилок, духовок, микроволновок и т.д.) . Дегидратации подвергают овощи, фрукты, ягоды, грибы, мясо, рыбу, молоко. {"q1": "using=", "q2": 8}
				- для заморозки [filter] Заморозка — способ консервирования пищевых продуктов, основанный на снижении температуры до такого уровня, при котором прекращается развитие микроорганизмов и ферментативных процессов. Заморозка овощей позволяет сохранить их питательные и вкусовые свойства, уменьшить их массу и объем, увеличить срок хранения {"q1": "using=", "q2": 9}
			- длительное хранение [filter] Длительное хранение — это способ обеспечения плодоовощной продукцией в течение всего года, а также снижения потерь урожая. Для длительного хранения овощей необходимо создать оптимальные условия температуры, влажности, вентиляции и освещения, при которых прекращается или замедляется развитие микроорганизмов и ферментативных процессов. Длительное хранение овощей возможно в различных помещениях, таких как погреба, подвалы, холодильные камеры, кладовки или специальные шкафы и ящики. Длительное хранение овощей зависит от их сорта, степени зрелости, способа сбора и упаковки. Сроки длительного хранения овощей варьируются от нескольких недель до нескольких месяцев. {"q1": "using=", "q2": 10}
			- для производства сока [filter] Производство сока это процесс получения жидкого пищевого продукта из съедобных частей фруктов, ягод и овощей путем физического воздействия {"q1": "using=", "q2": 11}
			- диетическое питание [filter] Диетическое питание — это система питания, которая используется для лечения или профилактики различных заболеваний или состояний, связанных с нарушением обмена веществ, пищеварения, сердечно-сосудистой системы и т.д. Диетическое питание подбирается индивидуально в зависимости от диагноза, возраста, пола и других факторов. Диетическое питание может включать или исключать определенные продукты питания, а также регулировать их количество, сочетание и способ приготовления {"q1": "using=", "q2": 12}
			- для свежего употребления [filter] Свежее употребление овощей, фруктов и ягод в натуральном виде, без тепловой обработки или консервации. Свежие фрукты имеют много полезных свойств для здоровья человека. Они богаты витаминами, антиоксидантами, минералами и клетчаткой, которые укрепляют иммунитет, улучшают обмен веществ, предотвращают развитие многих заболеваний
			- высокие вкусовые качества [filter] Характеристика продуктов питания, которая означает, что они имеют приятный вкус, аромат, цвет и текстуру. {"q1": "using=", "q2": 13}
			- для соуса [filter] Соус — это жидкая приправа к основному блюду и/или гарниру. Соусы придают более сочную консистенцию блюдам и повышают их калорийность. Многие соусы содержат специи и вкусовые вещества, которые действуют возбуждающе на органы пищеварения {"q1": "using=", "q2": 14}
			- сильный аромат [filter] {"q1": "using=", "q2": 15}
			- для срезки [filter] {"q1": "using=", "q2": 16}
		- стабильный урожай [filter] {"q1": "using=", "q2": 16}
		- лекарственное применение [filter] Растения или их части используются для профилактики и лечения разных заболеваний человека и животных {"q1": "using=", "q2": 17}
		- техническое применение [filter] Растения или их части используются как сырье для разных отраслей промышленности. Техническое использование растений может быть связано с получением древесины, волокон, масел, красителей, смол, каучука и других продуктов. {"q1": "using=", "q2": 18}
		- декоративное применение [filter] Растения или их части используются для украшения жилых и общественных помещений, садов и парков. Декоративные растения имеют красивые цветы, листву, плоды или форму. 
	- форма цветов и плодов [folder] Характеристика, которая отражает внешний вид и строение этих частей растений.
		- (↓) список всех значений из поля shape [filter]
		- кубообразная [filter] {"q1": "shape=", "q2": 1}
		- шарообразная [filter] {"q1": "shape=", "q2": 2}
	- устойчивость к болезням [folder] Устойчивость к болезням — это способность растений в той или иной мере противостоять заселению или заражению вредными организмами, такими как грибы, бактерии, вирусы, насекомые и т.д. Устойчивость к болезням может быть обусловлена разными факторами, такими как морфологические, химические, физиологические и генетические особенности растений. Устойчивость к болезням может быть разной по степени и по спектру: некоторые растения могут быть полностью невосприимчивы к определенным патогенам (иммунитет), другие могут быть частично устойчивы к некоторым патогенам (толерантность), а третьи могут быть восприимчивы к большинству патогенов (чувствительность). Устойчивость к болезням может быть природной или приобретенной: природная устойчивость выработалась в процессе эволюции растений в центрах их происхождения на фоне длительного естественного заражения возбудителями болезней; приобретенная устойчивость может быть создана различными методами, такими как селекция, генная инженерия, вакцинация, химическая и биологическая иммунизация растений. Устойчивость к болезням имеет большое значение для сельского хозяйства и садоводства, так как позволяет снизить потери урожая и качества продукции, сократить расходы на защиту растений от вредителей и болезней, повысить экологическую безопасность и продовольственную безопасность.
		- грибковые заболевания [folder] Инфекции, вызванные грибами, которые поражают растительные ткани. Грибы могут вызывать разные симптомы у растений, такие как пятна, гниль, ржавчина, виляние (потеря твердости неодревесневших частей растений), пятристость, кольца и опухоли
			- альтернариоз [filter] {"q1": "stab=", "q2": 1}
			- антракноз [filter] {"q1": "stab=", "q2": 2}
			- аскохитоз [filter] {"q1": "stab=", "q2": 3}
			- вертициллез [filter] {"q1": "stab=", "q2": 4}
			- гельминтоспориоз [filter] {"q1": "stab=", "q2": 5}
			- кладоспориоз [filter] {"q1": "stab=", "q2": 6}
			- мишеневидная пятнистость листьев [filter] {"q1": "stab=", "q2": 7}
			- моноспорасковая гниль [filter] {"q1": "stab=", "q2": 8}
			- мучнистая роса [filter] {"q1": "stab=", "q2": 9}
			- ложная мучнистая роса [filter] {"q1": "stab=", "q2": 10}
			- септориоз [filter] {"q1": "stab=", "q2": 11}
			- серая гниль [filter] {"q1": "stab=", "q2": 12}
			- склеротиниоз [filter] {"q1": "stab=", "q2": 13}
			- стеблевая гниль [filter] {"q1": "stab=", "q2": 14}
			- угольная гниль [filter] {"q1": "stab=", "q2": 15}
			- фитофтороз [filter] {"q1": "stab=", "q2": 16}
			- фомоз [filter] {"q1": "stab=", "q2": 17}
			- фузариоз [filter] {"q1": "stab=", "q2": 18}
			- церкоспороз  [filter] {"q1": "stab=", "q2": 19}
			- черная ножка [filter] {"q1": "stab=", "q2": 20}
			- черная стеблевая гниль [filter] {"q1": "stab=", "q2": 21}
			- пузырчатая головня [filter] {"q1": "stab=", "q2": 22}
			- ризоктониоз [filter] {"q1": "stab=", "q2": 23}
			- ооспороз [filter] {"q1": "stab=", "q2": 24}
			- парша обыкновенная [filter] {"q1": "stab=", "q2": 25}
			- фомопсис [filter] {"q1": "stab=", "q2": 26}
		- вирусные заболевания [folder] Инфекции, вызванные вирусами, которые поражают растительные клетки. Вирусы могут вызывать разные симптомы у растений, такие как пятна, мозаика, искривление и деформация листьев и плодов
			- вирус бронзовости томата [filter] {"q1": "stab=", "q2": 27}
			- вирус желтой курчавости листьев томата [filter] {"q1": "stab=", "q2": 28}
			- вирус табачной мозаики [filter] {"q1": "stab=", "q2": 29}
			- тобамовирус [filter] {"q1": "stab=", "q2": 30}
			- вирус мозаики пепино [filter] {"q1": "stab=", "q2": 31}
			- вирус томатной мозаики [filter] {"q1": "stab=", "q2": 32}
			- вирус торрадо мозаики [filter] {"q1": "stab=", "q2": 33}
			- вирус точечной мозаики [filter] {"q1": "stab=", "q2": 34}
			- вирус скручивания листа [filter] {"q1": "stab=", "q2": 35}
			- обыкновенная мозаика на огурцах [filter] {"q1": "stab=", "q2": 36}
			- Y-вирус картофеля [filter] {"q1": "stab=", "q2": 37}
		- бактериальные заболевания [folder] Инфекции, вызванные бактериями, которые поражают растительные ткани. Бактерии могут вызывать разные симптомы у растений, такие как виляние (потеря твердости неодревесневших частей растений), некроз, мягкая гниль и опухоли
			- бактериальная пятнистость [filter] {"q1": "stab=", "q2": 38}
			- бактериальная пятнистость плодов [filter] {"q1": "stab=", "q2": 39}
			- бактериальное увядание [filter] {"q1": "stab=", "q2": 40}
			- бактериальные гнили плодов [filter] {"q1": "stab=", "q2": 41}
			- бактериальный рак [filter] {"q1": "stab=", "q2": 42}
			- некроз сердцевины [filter] {"q1": "stab=", "q2": 43}
			- черная бактериальная пятнистость [filter] {"q1": "stab=", "q2": 44}
			- столбур [filter] {"q1": "stab=", "q2": 45}
		- абиотические факторы [folder] Неживые физические и химические аспекты окружающей среды, которые влияют на жизнь растений. К таким факторам относятся свет, температура, влажность, ветер, почва, минералы и другие. Абиотические факторы играют важную роль в формировании растительной экологии, так как они определяют условия для фотосинтеза, роста, развития и физиологической активности растений. Абиотические факторы могут изменяться со временем и пространством, в зависимости от сезона, климата и человеческого воздействия. Некоторые абиотические факторы могут быть благоприятными для одних видов растений и неблагоприятными для других. Например, высокая концентрация соли в почве может быть токсичной для большинства растений, но некоторые галофиты могут выдерживать высокую соленость и даже использовать ее как защиту от гербиворов.
			- загрязнение воздуха [filter] {"q1": "stab=", "q2": 46}
			- пониженные температуры [filter] {"q1": "stab=", "q2": 47}
			- засуха [filter] {"q1": "stab=", "q2": 48}
			- повышенные температуры [filter] {"q1": "stab=", "q2": 49}
			- избыточная влажность почвы [filter] {"q1": "stab=", "q2": 50}
			- осыпание плодов [filter] {"q1": "stab=", "q2": 51}
			- повреждение ветром [filter] {"q1": "stab=", "q2": 52}
			- нехватка веществ [filter] {"q1": "stab=", "q2": 53}
			- избыточность пестицидов [filter] {"q1": "stab=", "q2": 54}
			- вершинная гниль [filter] {"q1": "stab=", "q2": 55}
			- растрескивание [filter] {"q1": "stab=", "q2": 56}
			- солнечный ожог [filter] {"q1": "stab=", "q2": 57}
			- солевое повреждение [filter] {"q1": "stab=", "q2": 58}
			- цветушность [filter] {"q1": "stab=", "q2": 59}
			- требовательность к уходу [filter] {"q1": "stab=", "q2": 60}
			- горечь плодов [filter] {"q1": "stab=", "q2": 61}
			- транспортабельность [filter] {"q1": "stab=", "q2": 62}
		- простейшие паразиты [folder] Инфекции, вызванные одноклеточными организмами, которые относятся к разным группам протистов. Простейшие паразиты могут заражать разные части растения, такие как корни, стебли, листья и цветки.
			- кила [filter] {"q1": "stab=", "q2": 63}
			- нематоз [filter] {"q1": "stab=", "q2": 64}
	- гибрид [filter] Гибрид растения — это растение, полученное в результате скрещивания двух или более генетически различных форм растений, принадлежащих одному виду, одному роду или разным родам. Гибриды растений могут обладать новыми свойствами, которые отсутствуют у исходных форм, такими как устойчивость к болезням и вредителям, повышенная урожайность и качество продукции, измененный цвет и форма цветов и плодов и т.д. Гибриды растений могут быть естественными или искусственными: естественные гибриды возникают в природе в результате случайного скрещивания растений, находящихся в близком контакте; искусственные гибриды создаются человеком с помощью различных методов, таких как ручное опыление, эмбриокультура, генная инженерия и т.д. {"q1": "is_hybrid=", "q2": true}
	- сорт [filter] Группа культурных растений, полученная в результате селекции в рамках низшего из известных ботанических таксонов и обладающая определённым набором характеристик (полезных или декоративных), который отличает эту группу растений от других растений того же вида {"q1": "is_hybrid=", "q2": false}
	- ремантанность [filter] Способность растений к повторному или многократному цветению или плодоношению в течение одного вегетационного периода. {"q1": "is_remantancy=", "q2": true}
	- высота растения [form] {"q1": "height=", "q2": null, "mx": [20, 310], "ns": "m"}
	- занимаемая растением площадь [form] {"q1": "square=", "q2": null, "mx": [0.25, 3.45], "ns": "m²"}
	- цвет листвы [folder] Цвет листвы у растений зависит от разных пигментов, которые содержатся в листовых клетках. Самый распространенный пигмент — хлорофилл, который придает листьям зеленый цвет и участвует в фотосинтезе1. Кроме хлорофилла, в листьях могут присутствовать другие пигменты, такие как каротиноиды (желтые или оранжевые) и антоцианы (красные, рыжие или синие). Эти пигменты могут быть видны в разное время года или при разных условиях освещения, температуры и влажности. Например, осенью листья некоторых растений меняют цвет с зеленого на красный или желтый из-за уменьшения количества хлорофилла и увеличения количества каротиноидов и антоцианов
		- красный [filter] {"q1": "cofo=", "q2": 1, "color": "#ff0000"}
		- розовый [filter]  {"q1": "cofo=", "q2": 2, "color": "#FFC0CB"}
		- антрацитовый [filter] {"q1": "cofo=", "q2": 3, "color": "#373f43"}
		- бордовый [filter] {"q1": "cofo=", "q2": 4, "color": "#800000"}
		- желтый [filter] {"q1": "cofo=", "q2": 5, "color": "#FFFF00"}
		- оранжевый [filter] {"q1": "cofo=", "q2": 6, "color": "#FF6600"}
		- бурый [filter] {"q1": "cofo=", "q2": 7, "color": "#654321"}
		- зеленый [filter] {"q1": "cofo=", "q2": 8, "color": "#32CD32"}
		- изумрудный [filter] {"q1": "cofo=", "q2": 9, "color": "#50C878"}
		- оливковый [filter] {"q1": "cofo=", "q2": 10, "color": "#808000"}
		- кремовый [filter] {"q1": "cofo=", "q2": 11, "color": "#FFFDD0"}
		- миртовый [filter] {"q1": "cofo=", "q2": 12, "color": "#21421e"}
	- цвет цветов [folder]
		- красный [filter] {"q1": "cofl=", "q2": 1, "color": "#ff0000"}
		- розовый [filter]  {"q1": "cofl=", "q2": 2, "color": "#FFC0CB"}
		- антрацитовый [filter] {"q1": "cofl=", "q2": 3, "color": "#373f43"}
		- бордовый [filter] {"q1": "cofl=", "q2": 4, "color": "#800000"}
		- желтый [filter] {"q1": "cofl=", "q2": 5, "color": "#FFFF00"}
		- оранжевый [filter] {"q1": "cofl=", "q2": 6, "color": "#FF6600"}
		- бурый [filter] {"q1": "cofl=", "q2": 7, "color": "#654321"}
		- зеленый [filter] {"q1": "cofl=", "q2": 8, "color": "#32CD32"}
		- изумрудный [filter] {"q1": "cofl=", "q2": 9, "color": "#50C878"}
		- оливковый [filter] {"q1": "cofl=", "q2": 10, "color": "#808000"}
		- кремовый [filter] {"q1": "cofl=", "q2": 11, "color": "#FFFDD0"}
		- миртовый [filter] {"q1": "cofl=", "q2": 12, "color": "#21421e"}
	- урожайность [form] Количество растениеводческой продукции (kg), получаемой с единицы площади посева или посадки (m²). Урожайность обусловлена генетикой растения, однако в значительной степени зависит и от условий выращивания.  При неблагоприятных условиях выращивания урожайность снижается. {"q1": "productivity=", "q2": null, "mx": [0.25, 25.1], "ns": "kg/m²"}
	- скороспелость [form] Период исчисляемый в днях от всходов или «пробуждения» до момента когда растение начинает приносить пользу. Для плодово-фруктовых растений это начало плодоношения, а для цветов - начало цветения.  Скорость роста обусловлена генетикой растений, однако в значительной степени зависит и от условия выращивания. При неблагоприятных условиях выращивания скорость роста смещается в сторону увеличения. {"q1": "precocity=", "q2": null, "mx": [15, 145], "ns": "d"}
	- время плодоношения / цветения [form] Период исчисляемый в днях от начала плодоношения у фруктово-овощных растений и цветения для декоративных растений и до окончания этих процессов.  {"q1": "fruiting=", "q2": null, "mx": [15, 145], "ns": "d"}
	- диаметр плода [form] {"q1": "diameter=", "q2": null, "mx": [0.5, 30], "ns": "cm"}
	- длина плода [form] {"q1": "length=", "q2": null, "mx": [0.5, 50], "ns": "cm"}
	- масса плода [form] {"q1": "weight=", "q2": null, "mx": [0.2, 300], "ns": "g"}
	- толщина стенок плода [form] {"q1": "pericarp=", "q2": null, "mx": [0.2, 300], "ns": "mm"}
	- цвет плодов [folder]
		- красный [filter] {"q1": "cofl=", "q2": 1, "color": "#ff0000"}
		- розовый [filter]  {"q1": "cofl=", "q2": 2, "color": "#FFC0CB"}
		- антрацитовый [filter] {"q1": "cofl=", "q2": 3, "color": "#373f43"}
		- бордовый [filter] {"q1": "cofl=", "q2": 4, "color": "#800000"}
		- желтый [filter] {"q1": "cofl=", "q2": 5, "color": "#FFFF00"}
		- оранжевый [filter] {"q1": "cofl=", "q2": 6, "color": "#FF6600"}
		- бурый [filter] {"q1": "cofl=", "q2": 7, "color": "#654321"}
		- зеленый [filter] {"q1": "cofl=", "q2": 8, "color": "#32CD32"}
		- изумрудный [filter] {"q1": "cofl=", "q2": 9, "color": "#50C878"}
		- оливковый [filter] {"q1": "cofl=", "q2": 10, "color": "#808000"}
		- кремовый [filter] {"q1": "cofl=", "q2": 11, "color": "#FFFDD0"}
		- миртовый [filter] {"q1": "cofl=", "q2": 12, "color": "#21421e"}
	- цвет мякоти плодов [folder]
		- красный [filter] {"q1": "cofl=", "q2": 1, "color": "#ff0000"}
		- розовый [filter]  {"q1": "cofl=", "q2": 2, "color": "#FFC0CB"}
		- антрацитовый [filter] {"q1": "cofl=", "q2": 3, "color": "#373f43"}
		- бордовый [filter] {"q1": "cofl=", "q2": 4, "color": "#800000"}
		- желтый [filter] {"q1": "cofl=", "q2": 5, "color": "#FFFF00"}
		- оранжевый [filter] {"q1": "cofl=", "q2": 6, "color": "#FF6600"}
		- бурый [filter] {"q1": "cofl=", "q2": 7, "color": "#654321"}
		- зеленый [filter] {"q1": "cofl=", "q2": 8, "color": "#32CD32"}
		- изумрудный [filter] {"q1": "cofl=", "q2": 9, "color": "#50C878"}
		- оливковый [filter] {"q1": "cofl=", "q2": 10, "color": "#808000"}
		- кремовый [filter] {"q1": "cofl=", "q2": 11, "color": "#FFFDD0"}
		- миртовый [filter] {"q1": "cofl=", "q2": 12, "color": "#21421e"}
	- лежкость плодов [form] Способность плодов сохранять свежесть и качество после сбора урожая. Лежкость зависит от многих факторов, таких как сорт, условия выращивания, сроки и способы уборки, хранения и транспортировки. Лежкость важна для растений, которые предназначены для длительного хранения или переработки, например, капусты, моркови, картофеля, яблок и др  {"q1": "storage=", "q2": null, "mx": [1, 360], "ns": "d"}
	- жгучесть [form] Свойство плодов некоторых растений, вызывающее ощущение жжения во рту при употреблении. Жгучесть плодов обусловлена наличием в них алкалоида капсаицина, который раздражает нервные окончания на слизистой оболочке рта и языка. Жгучесть плодов измеряется по шкале Сковилла, которая выражает количество капсаицина в миллионах единиц (SHU). Чем больше значение SHU, тем острее плод. Например, жгучесть плода перца Каролина Рипер составляет 2 200 000 SHU, а жгучесть плода сладкого перца — 0 SHU. Жгучесть плодов может иметь положительное влияние на здоровье человека, так как капсаицин стимулирует выработку эндорфинов, улучшает кровообращение, повышает иммунитет и обладает противовоспалительным действием {"q1": "scoville=", "q2": null, "mx": [0, 20000], "ns": "shu"}
	- содержание сахара [form] Количество углеводов, которые находятся в мякоти и соке плодов. Сахар в плодах представлен в виде фруктозы, глюкозы и сахарозы. Содержание сахара в плодах зависит от их вида, сорта, степени зрелости и условий выращивания. {"q1": "sugar=", "q2": null, "mx": [0, 20000], "ns": "%"}
	- актуально для регионов [folder]
	- актуально для посадки в период [form]  {"q1": "actual=", "q2": null, "mx": [1, 366], "ns": ""}
	- можно сажать сейчас [filter] Найденные растения можно будет посадить прямо сегодня. {"q1": "is_actual=", "q2": true }
- бренды [folder] Производители и продавцы посадочного материала, семеноводческие хозяйства, питомники, научно-исследовательские институты, фермерские хозяйства и садоводы-любители чье имя стало брендом.
	- Партнер [filter] {"q1": "brand=", "q2": 1}
	- АЭЛИТА [filter] {"q1": "brand=", "q2": 2}
	- Гавриш [filter] {"q1": "brand=", "q2": 3}
	- Евро-Семена [filter] {"q1": "brand=", "q2": 4}
	- Поиск [filter] {"q1": "brand=", "q2": 5}
	- Престиж семена [filter] {"q1": "brand=", "q2": 6}
	- Русский огород [filter] {"q1": "brand=", "q2": 7}
	- Агроуспех [filter] {"q1": "brand=", "q2": 8}
	- Семена Алтая [filter] {"q1": "brand=", "q2": 9}
	- Уральский дачник [filter] {"q1": "brand=", "q2": 10}
	- Компания Седек [filter] {"q1": "brand=", "q2": 11}
	- ПЛАЗМАС [filter] {"q1": "brand=", "q2": 12}
	- Биотехника [filter] {"q1": "brand=", "q2": 13}
	- Садовита [filter] {"q1": "brand=", "q2": 14}
- о записи [folder]
	- оценка [form]  {"q1": "rating=", "q2": null, "mx": [1, 10], "ns": ""}
	- есть статья [filter] Для выбранных растений уже написана статья, что поспособствует получению более полной информации. {"q1": "is_article=", "q2": true }
	- есть отзывы [filter] Для выбранных растений присутствует обратная связь пользователей нашего ресурса, что может поспособствовать получению более полной информации. {"q1": "is_comment=", "q2": true }
	- есть информация о том где купить [filter]  {"q1": "is_shop=", "q2": true }
	- есть фотографии [filter] Для выбранных растений предоставлены фотографии, которые позволят узнать больше об этих растениях. {"q1": "is_photo=", "q2": true }
`


const getIndent = (s) => {
	let indents = 0
	const array = s.split("")

	for (let index = 0; index < array.length; index++) {
		if (array[index] != '\t') return indents
		indents++
	}
}


const re = /(\{.+\})/


const getObject = (s, p, i) => {
	let name, description, type;
	let props = {}

	if (s.includes('[folder]')) {

		[name, description] = s.split('[folder]')
		type = 'folder'

	} else if (s.includes('[filter]')) {

		[name, description] = s.split('[filter]')
		type = 'filter'
		
		const m = re.exec(s)
		if (m) props = JSON.parse(m[0])

	} else if (s.includes('[folder+filter]')) {

		[name, description] = s.split('[folder+filter]')
		type = 'folder+filter'

	} else if (s.includes('[form]')) {

		[name, description] = s.split('[form]')
		type = 'form'

		const m = re.exec(s)
		if (m) props = JSON.parse(m[0])

	}

	

	name = name.replace("- ", "").trim()
	description = description.replace(re, "").trim()

	return { id: i, type, parent: p, name, description, ...props }
}



let current_id = 0
let parents = [0, ]
let lastindent = 0
let result = []

const strings = harvesting.split('\n').filter(x => x != "" & !x.includes('(↓)'))
for (let i = 0; i < strings.length; i++) {

	const s = strings[i];
	const current_indent = getIndent(s)

	parents = parents.slice(0, current_indent + 1)

	if (current_indent > lastindent) {
		parents.push(current_id)
		lastindent = Number(current_indent)
	}

	current_id++
	result.push(
		getObject(s, parents.slice(-1)[0], current_id)
	)
}


fs.writeFileSync(
	'test-all-plant-filters.json', 
	JSON.stringify(result, null, 4)
)


console.log(result)
