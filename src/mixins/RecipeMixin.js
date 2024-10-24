export const RecipeMixin = {
    data() {
        return {
            resultText: '',
            isRecipeGenerated: false
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
            } else if (craftingType === 'dire') {
                this.resultText = `mods.avaritia.ExtremeCrafting.addShaped(${crafted},<br>[[${formattedSlots}]]);`;
            }
        },

        showRecipeText(slots, craftedItem, craftingType) {
            this.generateRecipeText(slots, craftedItem, craftingType);
            this.isRecipeGenerated = true;

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
                this.isRecipeGenerated = false;
            }
        }
    }
};