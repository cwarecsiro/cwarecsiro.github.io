L.TaxaSelect = {};
L.TaxaSelect.Taxa = {"Amphibia", "Reptilia", "Gastropoda", "Vascular plants"}

L.TaxaSelect = L.Control.extend({
	options: {
		position: 'topright',
		title: 'Taxa',
		exclude: [],
		include: [],
		taxa: L.TaxaSelect.taxa,
	},
	onAdd: function(map) {
		
		
		var div = L.DomUtil.create('div', 'info legend');
		div.innerHTML = '<select><option>Amphibia</option><option>Reptilia</option><option>Gastropoda</option><option>Vascular plants</option></select>';
		div.firstChild.onmousedown = div.firstChild.ondblclick = L.DomEvent.stopPropagation;
		return div;
		
		/*	
		
		this.div = L.DomUtil.create('div','leaflet-taxaselect-container');
		this.select = L.DomUtil.create('select','leaflet-taxaselect',this.div);
		var content = '';
		
		
		
		if (this.options.title.length > 0 ){
			content += '<option>'+this.options.title+'</option>';
		}
		
		var taxa = (Array.isArray(this.options.include) && this.options.include.length > 0) ? this.options.include : this.options.taxa;

		var taxaKeys = Object.keys(taxa).sort();
		for (i in taxaKeys){
			if (this.options.exclude.indexOf(taxaKeys[i]) == -1){
				content+='<option>'+taxaKeys[i]+'</option>';
			}
		}
		
		this.select.innerHTML = content;

		this.select.onmousedown = L.DomEvent.stopPropagation;
		
		return this.div;
		*/
	},
	on: function(type,handler){
		if (type == 'change'){
			this.onChange = handler;
			L.DomEvent.addListener(this.select,'change',this._onChange,this);			
		} else if (type == 'click'){ //don't need this here probably, but for convenience?
			this.onClick = handler;
			L.DomEvent.addListener(this.select,'click',this.onClick,this);			
		} else {
			console.log('TaxaSelect - cannot handle '+type+' events.')
		}
	},
	_onChange: function(e) {
		var selectedTaxa = this.select.options[this.select.selectedIndex].value;
		e.feature = this.options.taxa[selectedTaxa];
		this.onChange(e);
	}
});

L.TaxaSelect = function(id,options){
	return new L.TaxaSelect(id,options);
};
