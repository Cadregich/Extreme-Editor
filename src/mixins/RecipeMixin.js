export const RecipeMixin = {
    data() {
        return {
            resultText: '',
            isRecipeGeneratedOrEditing: false,
            addRemoveOldRecipeText: false
        };
    },
    methods: {
        generateRecipeText(slots, craftedItem, craftingType) {
            const formattedSlots = slots.map(row =>
                `${row.map(item => item === null ? 'null' : `'${item}'`).join(', ')}`
            ).join(',' + "<br>");

            let crafted = craftedItem === "" ? "null" : craftedItem;
            if (craftingType === 'regular') {
                this.resultText = `recipes.addShaped(${crafted},<br>[[${formattedSlots}]]);`;

                if (this.addRemoveOldRecipeText) {
                    this.resultText = `recipes.removeShaped(${crafted});<br><br>${this.resultText}`
                }
            } else if (craftingType === 'dire') {
                this.resultText = `mods.avaritia.ExtremeCrafting.addShaped(${crafted},<br>[[${formattedSlots}]]);`;

                if (this.addRemoveOldRecipeText) {
                    this.resultText = `mods.avaritia.ExtremeCrafting.remove(${crafted});<br><br>${this.resultText}`;
                }
            }
        },

        showRecipeText(slots, craftedItem, craftingType) {
            this.generateRecipeText(slots, craftedItem, craftingType);
            this.isRecipeGeneratedOrEditing = true;

            this.$nextTick(() => {
                const resultElement = this.$refs.result;
                if (resultElement) {
                    resultElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            });
        },

        copyToClipboard() {
            const resultText = this.resultText.replace(/<br\s*\/?>/g, '\n');
            navigator.clipboard.writeText(resultText)
                .then(() => {
                    alert('Рецепт скопирован в буфер обмена!');
                })
                .catch(err => {
                    console.error('Ошибка при копировании: ', err);
                });
        },

        clearFields(slots) {
            const isConfirmed = confirm("Вы уверены, что хотите очистить рецепт и поля?");
            if (isConfirmed) {
                slots.forEach(row => row.fill(null));
                this.resultText = '';
                this.$store.state.recipeRawText = '';
                this.isRecipeGeneratedOrEditing = false;
                return true;
            }
        },

        async fastPasteFromClipboard(event) {
            let craftingSlot = !event.target.hasAttribute('data-row');

            try {
                const text = await navigator.clipboard.readText();
                event.target.value = text;
                if (!craftingSlot) {
                    const row = parseInt(event.target.getAttribute('data-row'));
                    const slot = parseInt(event.target.getAttribute('data-slot'));
                    this.slots[row][slot] = text;
                } else {
                    this.craftedItem = text;
                }

            } catch (error) {
                console.error('Не удалось вставить текст из буфера обмена:', error);
            }
        },

        fastCleanSlot(event) {
            let craftingSlot = !event.target.hasAttribute('data-row');

            if (event.button === 2) {
                event.preventDefault();
                const currentTime = new Date().getTime();

                if (currentTime - this.lastRightClickTime < 400) {
                    if (!craftingSlot) {
                        const row = parseInt(event.target.getAttribute('data-row'));
                        const slot = parseInt(event.target.getAttribute('data-slot'));
                        this.slots[row][slot] = '';
                    } else {
                        this.craftedItem = '';
                    }
                }

                this.lastRightClickTime = currentTime;
            }
        }
    }
};
