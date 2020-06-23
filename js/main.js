/**
* Steps
*/
	// step 1
	Vue.component(
		'mx_step_1',
		{
			template: `
				<div>
					<div class="form-input-material">
					
						<label for="mx_step_1_name">User Name</label>
						<input
							type="text"
							id="mx_step_1_name"
							v-model="mx_step_1_name"
						/>
					</div>

					<div class="form-input-material">
						<label for="mx_step_1_position">User Position</label>
						<input
							type="text"
							id="mx_step_1_position"
							v-model="mx_step_1_position"
						/>
					</div>
					
				</div>
			`,

			data() {
				return {
					mx_step_1_name: 	null,
					mx_step_1_position: null,

					step: {
						_index: 	1,
						complete: 	false
					}
				}
			},

			watch: {
				mx_step_1_name: function() {
					
					this.mxCheckStep()

				},

				mx_step_1_position: function() {
					
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
						mx_step_1_name: 	_this.mx_step_1_name,
						mx_step_1_position: _this.mx_step_1_position,

						step: 				_this.step
					} )

				},

				dataValidation() {

					if(
						this.mx_step_1_name &&
						this.mx_step_1_position
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
					<span>Colors:</span>
					<div>
						<label for="mx_step_2_color_red">Red</label>
						<input
							type="radio"
							id="mx_step_2_color_red"
							name="mx_step_2_color"
							v-model="mx_step_2_color"
							value="red"
						/>
					</div>

					<div>
						<label for="mx_step_2_color_blue">Blue</label>
						<input
							type="radio"
							id="mx_step_2_color_blue"
							name="mx_step_2_color"
							v-model="mx_step_2_color"
							value="blue"
						/>
					</div>
					
				</div>
			`,

			data() {
				return {
					mx_step_2_color: 	'red',

					step: {
						_index: 	2,
						complete: 	true
					}
				}
			},

			watch: {

				mx_step_2_color: function() {
					
					this.mxCheckStep()

				}

			},

			methods: {

				mxCheckStep() {
						
					// send data
					let _this = this

					this.$emit( 'data_step_2', {
						mx_step_2_color: 	_this.mx_step_2_color,

						step: 				_this.step
					} )

				}

			},

			created() {

				// send data
				let _this = this

				this.$emit( 'data_step_2', {
					mx_step_2_color: 	_this.mx_step_2_color,

					step: 				_this.step
				} )

			}

		}
	)

	// step 3
	Vue.component(
		'mx_step_3',
		{
			template: `
				<div>

					<span>Planets:</span>
					<div>
						<label for="mx_step_3_mercury">Mercury</label>
						<input
							type="checkbox"
							id="mx_step_3_mercury"
							v-model="mx_step_3_mercury"
						/>
					</div>

					<div>
						<label for="mx_step_3_venus">Venus</label>
						<input
							type="checkbox"
							id="mx_step_3_venus"
							v-model="mx_step_3_venus"
						/>
					</div>

					<div>
						<label for="mx_step_3_earth">Earth</label>
						<input
							type="checkbox"
							id="mx_step_3_earth"
							v-model="mx_step_3_earth"
						/>
					</div>
					
				</div>
			`,

			data() {
				return {
					mx_step_3_mercury: false,
					mx_step_3_venus: false,
					mx_step_3_earth: false,

					step: {
						_index: 	3,
						complete: 	false
					}
				}
			},

			watch: {
				mx_step_3_mercury: function() {
					
					this.mxCheckStep()

				},

				mx_step_3_venus: function() {
					
					this.mxCheckStep()

				},

				mx_step_3_earth: function() {
					
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
						mx_step_3_mercury: 	_this.mx_step_3_mercury,
						mx_step_3_venus: 	_this.mx_step_3_venus,
						mx_step_3_earth: 	_this.mx_step_3_earth,

						step: 				_this.step
					} )

				},

				dataValidation() {

					if(
						this.mx_step_3_mercury ||
						this.mx_step_3_venus ||
						this.mx_step_3_earth

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
				<div
					v-if="error"
					class="mx-notification"
				>
					<span>{{ error }}</span>
				</div>
				
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

				<!-- Step 3 -->
				<mx_step_3
					@data_step_3="mxCollecting_data"
					v-show="currentStep === 3"
				></mx_step_3>

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
					<button
						class="btn btn-primary btn-ghost"				
						@click.prevent="mxFormSubmit"
					>Submit</button>
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
	el: '#step_by_step',
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