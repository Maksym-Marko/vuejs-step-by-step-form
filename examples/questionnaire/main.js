/**
* Steps
*/
	// step 1
	Vue.component(
		'mx_step_1',
		{
			template: `
				<div>

					<legend><span class="number">1</span> Candidate Info</legend>

					<input
						type="text"
						v-model="field1"
						placeholder="Your Name *"
					>
					<input
						type="email"
						v-model="field2"
						placeholder="Your Email *"
					>
					<textarea
						v-model="field3"
						placeholder="About yourself"
					></textarea>
					
				</div>
			`,

			data() {
				return {
					field1: 	null,
					field2: 		null,
					field3: 	null,

					step: {
						_index: 	1,
						complete: 	false
					}
				}
			},

			watch: {
				field1: function() {
					
					this.mxCheckStep()

				},

				field2: function() {
					
					this.mxCheckStep()

				},

				field3: function() {
					
					this.mxCheckStep()

				}
			},

			methods: {

				mxCheckStep() {

					// data validation
					this.dataValidation()
						
					// send data
					let _this = this

					this.$emit( 'data_step_1', {
						field1: 	_this.field1,
						field2: 	_this.field2,
						field3: 	_this.field3,

						step: 				_this.step
					} )

				},

				dataValidation() {

					if(
						this.field1 &&
						this.field3 &&
						this.field2
					) {

						this.step.complete = true

					} else {

						this.step.complete = false

					}

				}

			}

		}
	)

	// step 2
	Vue.component(
		'mx_step_2',
		{
			template: `
				<div>

					<label for="job">Interests:</label>
					<select id="job" v-model="field4">
						<optgroup label="Indoors">
						  <option value="fishkeeping">Fishkeeping</option>
						  <option value="reading">Reading</option>
						  <option value="boxing">Boxing</option>
						  <option value="debate">Debate</option>
						  <option value="gaming">Gaming</option>
						  <option value="snooker">Snooker</option>
						  <option value="other_indoor">Other</option>
						</optgroup>
						<optgroup label="Outdoors">
						  <option value="football">Football</option>
						  <option value="swimming">Swimming</option>
						  <option value="fishing">Fishing</option>
						  <option value="climbing">Climbing</option>
						  <option value="cycling">Cycling</option>
						  <option value="other_outdoor">Other</option>
						</optgroup>
					</select>  
					
				</div>
			`,

			data() {
				return {
					field4: 	null,

					step: {
						_index: 	2,
						complete: 	false
					}
				}
			},

			watch: {

				field4: function() {
					
					this.mxCheckStep()

				}
			},

			methods: {

				mxCheckStep() {

					// data validation
					this.dataValidation()
						
					// send data
					let _this = this

					this.$emit( 'data_step_2', {
						field4: 	_this.field4,

						step: 				_this.step
					} )

				},

				dataValidation() {

					if(
						this.field4
					) {

						this.step.complete = true

					} else {

						this.step.complete = false

					}

				}

			}

		}
	)

	// step 3
	Vue.component(
		'mx_step_3',
		{
			template: `
				<div>

					<legend><span class="number">2</span> Additional Info</legend>
					<textarea
						v-model="field5"
						placeholder="About Your School"
					></textarea>
					
				</div>
			`,

			data() {
				return {
					field5: 	null,

					step: {
						_index: 	3,
						complete: 	false
					}
				}
			},

			watch: {

				field5: function() {
					
					this.mxCheckStep()

				}
			},

			methods: {

				mxCheckStep() {

					// data validation
					this.dataValidation()
						
					// send data
					let _this = this

					this.$emit( 'data_step_3', {
						field5: 	_this.field5,

						step: 				_this.step
					} )

				},

				dataValidation() {

					if(
						this.field5
					) {

						this.step.complete = true

					} else {

						this.step.complete = false

					}

				}

			}

		}
	)

/**
* Form
*/
Vue.component( 
	'mx_step_by_step_form',
	{
		template: ` 
			<form>
				<!-- Navigation -->
				<ul class="mx-step-by-step-navigation">
					<li
						v-for="step in stepsCount"
						:key="step"
						:class="[step === currentStep ? 'mx-current-ster' : '']"
					>
						<span>{{ step }}</span>
					</li>
				</ul>
				<!-- Notification -->

				<!-- Notification -->
				<div
					v-if="error"
					class="mx-notification"
				>
					<span>{{ error }}</span>
				</div>

				<fieldset>				
					
					<!-- Step 1 -->
					<mx_step_1
						@data_step_1="mxCollecting_data"
						v-show="currentStep === 1"
					></mx_step_1>

					<!-- Step 2 -->
					<mx_step_2
						@data_step_2="mxCollecting_data"
						v-show="currentStep === 2"
					></mx_step_2>

				</fieldset>


				<fieldset>
					
					<!-- Step 3 -->
					<mx_step_3
						@data_step_3="mxCollecting_data"
						v-show="currentStep === 3"
					></mx_step_3>

				</fieldset>

				<!-- Prev | Next buttons -->
				<div class="mx-prev-next-buttons-wrap">
					<a
						href="#"
						@click.prevent="mxPrevStep"
						v-if="currentStep > 1"
					>Prev</a>
					<a
						href="#"
						@click.prevent="mxNextStep"
						v-if="currentStep < stepsCount"
						:class="[currentStepComplete ? 'mx-step-completed' : 'mx-step-uncompleted']"
					>Next</a>
				</div>

				<!-- Submit button -->
				<div
					class="mx-submit-wrap"
					v-if="currentStepComplete && stepsCount === currentStep"
				>
					<input 
						class="btn btn-primary btn-ghost"
						@click.prevent="mxFormSubmit"
						type="submit"
						value="Apply"
					/>
				</div>	
							
				
			</form>
		`,
		data() {
			return {
				stepsCount: 0,
				currentStep: 1,
				steps_data: {},
				currentStepComplete: false,
				models: {},
				error: null
			}
		},
		methods: {
			mxFormSubmit() {

				let _this = this

				Object.keys( this.steps_data ).forEach( function( key ) {

					Object.keys( _this.steps_data[key].models ).forEach( function( _key) {

						_this.models[_key] = _this.steps_data[key].models[_key]

					} )					

				} )

				// emit data
				this.$emit( 'mx_send_data', this.models )

			},
			mxPrevStep() {
				
				this.currentStep -= 1

				this.currentStepComplete = this.mxStepCompleted( this.currentStep )

			},

			mxNextStep() {

				// check property exists
				if( this.mxStepCompleted( this.currentStep ) ) {

					this.currentStep += 1

					this.currentStepComplete = this.mxStepCompleted( this.currentStep )

				} else {

					this.mxEmptyField()

				}

			},

			mxEmptyField() {

				this.error = 'Please fill in required fields'

				let _this = this

				setTimeout( function() {

					_this.error = null

				}, 3000 )

			},

			mxStepCompleted( currentStep ) {

				if( this.steps_data.hasOwnProperty( currentStep ) ) {

					return this.steps_data[currentStep].step.complete

				}

				return false

			},

			mxCollecting_data( step_objs ) {				
				
				if( typeof step_objs !== 'object' ) return

				let _this = this

				Object.keys( step_objs ).forEach( function( key ) {

					var step = step_objs.step._index

					// check property exists
					if( ! _this.steps_data.hasOwnProperty( step ) ) {

						_this.steps_data[step] = {}
						_this.steps_data[step].models = {}

					}

					if( key !== 'step' ) {

						_this.steps_data[step].models[key] = step_objs[key]

					} else {

						_this.steps_data[step][key] = step_objs[key]

					}

				});

				// set steps
				this.currentStepComplete = this.mxStepCompleted( this.currentStep )

			}
		},

		mounted() {
			if( this.$children.length ) {

				this.stepsCount = this.$children.length

			}
		}
		
	}
)

/**
* Poup
*/
Vue.component(
	'mx-popup',
	{
		props: {
			content: {
				type: String,
				required: true
			}
		},
		template: `
			<div class="mx-popup">
				<span>{{ content }}</span>
			</div> 
		`
	}
)

var app = new Vue( {
	el: '#app',
	data: {
		setContent: null
	},
	methods: {
		mxSendData( _obj ) {

			console.log( _obj )

			// AJAX reques
			this.mxDispalyPopup( 'Data has sent successful!' )

		},

		mxDispalyPopup( content ) {

			this.setContent = content

			let _this = this

			setTimeout( function() {

				_this.setContent = null

			}, 4000 )

		}
	}
} )