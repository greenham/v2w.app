# v2w.app

## Overview

[v2w.app](https://v2w.app) is a volume to weight converter for the kitchen.

![Screenshot of the app](./public/screenshot.png)

It uses [known densities](http://blog.khymos.org/wp-content/2014/01/volume-weight-conversion-v2.xlsm) of specific ingredients to calculate the weight of a given volume of that ingredient.

Other sites/apps don't take this data into account and simply give you a static conversion.

## Why Weigh?

1. **Accuracy.** _See this video:_ [https://youtu.be/0uevI4-j-6A](https://youtu.be/0uevI4-j-6A)
2. **Speed & Efficiency.** _See this video:_ [https://youtu.be/YEt0I7I3MDM](https://youtu.be/YEt0I7I3MDM)

From [ChefSteps.com](https://www.chefsteps.com/activities/what-you-ll-need-scale):

> Just as a good thermometer eliminates a lot of the uncertainty and guesswork from cooking, the ease of quickly weighing ingredients avoids a lot of fumbling around with inaccurate measuring spoons and cups, and increases the consistency of your cooking.

## Supported Units

- US volume units: `t`, `T`, `floz`, `c`, `pt`, `qt`, `gal`
- Metric volume units: `ml`, `dl`, `l`
- US weight units: `oz`, `lb`
- Metric weight units: `g`, `kg`
- For items like `eggs`, `egg whites`, `egg yolks` and `sticks of butter`, the unit field is ignored.

## Supported Ingredients

278 ingredients are currently supported. The density data can be [found in this JSON file](./src/densities.json).

<details>
  <summary>Full ingredient list</summary>

- allspice, ground
- almonds, ground
- almonds, sliced
- almonds, whole
- anchovies
- anise seed, whole
- apples, dried
- apples, sliced
- apricots, dried
- arrowroot
- arrowroot flour
- bacon fat
- baking powder
- baking soda
- bamboo shoots
- bananas, mashed
- bananas, sliced
- barley flour
- barley, uncooked
- basil, dried
- basil, dried leaves
- bay leaf, crumbled
- beans, dried
- beef, cooked
- beef, raw
- biscuit mix (Bisquick)
- blackberries, raw
- blue corn meal
- blueberries, raw
- bran, unsifted
- brazil nuts, whole
- bread crumbs, fresh
- bread crumbs, packaged
- buckwheat groats
- bulgur, dry
- butter
- butter, stick
- buttermilk
- cabbage, shredded
- cake crumbs, fresh
- candied lemon peel
- candied orange peel
- caraway seed, whole
- cardamom, ground
- carob flour
- carrots, raw, chopped
- carrots, raw, grated
- cashews, oil roasted
- cauliflower fleurets
- cayenne, powder
- celery seed
- cereal, Rice Krispies
- cheese, cheddar, grated
- cheese, colby, grated
- cheese, cottage
- cheese, cream
- cheese, grated parmesan
- cheese, jack, grated
- chervil, dried
- chili powder
- chives, chopped dried
- chives, chopped fresh
- chocolate chips
- chocolate, cocoa powder
- chocolate, grated
- chocolate, melted
- cinnamon, ground
- cloves, ground
- cloves, whole
- cocoa powder
- coconut, shredded
- coffee, ground
- coffee, instant
- coriander seed
- corn, sweet yellow, raw
- cornmeal
- cornstarch (cornflour)
- cracker crumbs
- cranberries, raw, chopped
- cranberries, raw, whole
- cream
- cream of tartar
- cream of wheat
- crisco, melted
- crisco, solid
- cumin seed, whole
- currants
- curry powder
- dates, chopped
- dill seed
- egg
- egg noodles
- egg white
- egg yolk
- egg, beaten
- elderberries, raw
- evaporated milk
- farina
- fat, duck
- fennel seed, whole
- fenugreek seed
- figs, dried
- flour
- flour, plain wheat
- flour, plain wheat - scooped
- flour, plain wheat - spooned
- flour, potato
- flour, rice
- flour, semolina
- flour, whole wheat
- fungus, wood ear
- garlic powder
- garlic, minced
- gelatin
- ginger root, raw
- ginger root, raw, slices
- ginger, crystal
- ginger, fresh
- ginger, ground
- gooseberries, raw
- graham cracker crumbs
- grape nuts
- gumdrops
- gummi bears
- hazelnuts, whole
- honey
- kasha
- ketchup
- lard
- lemon juice
- lemon rind, grated
- lentils
- macaroni, uncooked
- mace, ground
- margarine
- marjoram, dried
- marshmallows, small
- mashed potatoes
- mayonnaise
- milk
- milk, evaporated
- milk, powdered
- millet flour
- molasses
- mulberries, raw
- mushrooms, Chinese black
- mushrooms, chopped
- mushrooms, sliced
- mushrooms, whole
- mustard seed
- mustard seed, ground
- mustard, dry
- mustard, prepared
- nutmeg, ground
- oatmeal, uncooked
- oats, rolled
- oats, steel-cut
- oil, vegetable
- olive oil
- olives, chopped
- onion, chopped
- onion, minced
- onion, sliced
- orange rind, grated
- oregano, dried, ground
- oregano, dried, leaves
- oreo cookies, crushed
- paprika
- paprika powder
- parsley, dried
- parsley, fresh
- pasta, egg noodles
- pasta, macaroni
- peanut butter
- peanuts
- peanuts, chopped
- peanuts, oil roasted
- peas, green, raw
- peas, uncooked
- pecans
- pecans, chopped
- pecans, ground
- pecans, shelled
- pepper, black, ground
- pepper, white, ground
- peppercorns, black
- peppercorns, white
- peppers, chopped chili
- pignolias (pine nuts)
- pistachio nuts, raw
- poppy seeds
- potato flour
- potatoes, cooked diced
- potatoes, mashed
- potatoes, sliced raw
- pumpkin pie spice
- pumpkin, cooked
- quinoa, uncooked
- raisins, seedless, not packed
- raisins, seedless, packed
- raspberries, raw
- rice flour, brown
- rice flour, white
- rice, arborio uncooked
- rice, brown, long-grain, uncooked
- rice, brown, medium-grain, uncooked
- rice, steamed
- rice, uncooked
- rice, uncooked Basmati
- rice, uncooked Jasmin
- rice, white, glutinous, uncooked
- rice, white, short-grain, uncooked
- rice, wild, uncooked
- rosemary, dried
- rosemary, fresh
- rum (40%)
- rye flour, dark
- rye flour, light
- rye flour, medium
- saffron
- sage, ground
- salt, kosher (Morton's)
- salt, table
- scallions (green onions)
- sesame seeds
- shallots
- sour cream
- soy sauce
- soymilk
- spaghetti, uncooked
- spearmint, dried
- spinach, cooked
- split peas
- strawberries, raw, halves
- strawberries, raw, pureed
- sugar
- sugar, brown
- sugar, castor
- sugar, confectioner's
- sugar, granulated
- sugar, powdered
- sultanas
- sunflower seeds, shelled
- sweet potatoes, cooked
- sweet potatoes, raw
- syrup, corn, dark
- syrup, corn, light
- syrups, maple
- tabasco
- tarragon, dried leaves
- tea
- thyme, dried, leaves
- thyme, fresh
- tiger lily blossoms
- tomato paste
- tomato puree
- tomatoes, chopped
- tomatoes, crushed, canned
- tuna, canned
- turmeric, ground
- vanilla extract
- vanilla wafers, crushed
- vinegar, balsamic
- vinegar, cider
- vodka, 40%
- walnuts, chopped
- walnuts, ground
- walnuts, shelled
- water
- wheat flour, whole-grain
- wheat germ
- wild rice
- wine, red
- wine, white
- yeast, active dry
- salt, kosher (Diamond Crystal)
- salt, sea (Maldon)
- fleur de sel
</details>
